import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemonList: [],
    detailList: []
  },
  mutations: {
    appendToList (state, items){
      state.pokemonList = state.pokemonList.concat(items)
    },
    clearList (state){
      state.pokemonList = []
    },
    appendToDetailList (state, item){
      state.detailList = state.detailList.concat(item)
    }
  },
  actions: {
    /**
     * First queries the API in order to receive the full count of pokemon
     * currently available. Next, queries the API for the full list of pokemon
     * available by adding the limit paramenter to the pokemon endpoint.
     * Mutates state accordingly.
     * 
     * Should only be called once, proper safety checks should be implemented
     * before calling this action.
     * @param {*} context 
     */
    fetchPokemonList (context) {
      if (this.state.pokemonList.length != 0){
        console.log("Pokemonlist in Store not empty. Won't fetch data from API")
        alert("Something went wrong while querying the API. Please refresh the page.")
      }

      let base = "https://pokeapi.co/api/v2/pokemon"
      var temp = []

      axios.get(base).then(response => {
        var pokemonCount = response.data.count
        if (pokemonCount != 0){
          let listUrl = base + "?limit=" + pokemonCount
          axios.get(listUrl).then(response => {
            temp = temp.concat(response.data.results)

            /**
             * Iterate over array of data as received
             * from API. Add id key to each item.
             * 
             * API returns ordered list, therefore the
             * correct pokemon id can easily be calculated.
             */
            temp.forEach(function (item, index) {
              item["id"] = index+1
            })

            context.commit('appendToList', temp)
          })
        } else {
          console.log("Pokemoncount returned from api: " + pokemonCount)
          console.log("Full response from API: " + response.data)
          alert("Something went wrong while querying the API. Please refresh the page.")
        }
      })

    },
    fetchPokemonDetailsByID (context, id) {
      let base = "https://pokeapi.co/api/v2/pokemon/" + id
      let baseSpecies = "https://pokeapi.co/api/v2/pokemon-species/" + id

      let reqDetails = axios.get(base)
      let reqSpecies = axios.get(baseSpecies)
      let temp = {}

      axios.all([reqDetails, reqSpecies]).then(axios.spread((...responses) => {
        const respDetails = responses[0]
        const respSpecies = responses[1]
        
        temp = respDetails.data
        console.log(respSpecies)
        temp["species"] = respSpecies.data.genera[7]
        /**
         * Flavor text distributed by API comes with special chars which need to
         * be removed before saving it to the store.
         * Basic sanitization using regex.
         */
        let cleanedFlavorText = respSpecies.data.flavor_text_entries[0].flavor_text.replace(/[^a-z0-9áéíóúñü .,_-]/gim, " ")
        temp["flavor_text"] = cleanedFlavorText
        context.commit('appendToDetailList', temp)
      })).catch(errors => {
        console.log(errors)
      })
    }
  },
  modules: {
  }
})
