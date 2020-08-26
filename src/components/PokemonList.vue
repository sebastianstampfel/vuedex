<template>
  <div class="pokemonlist-wrapper card">
    <h2 v-if="!listLoaded">Loading</h2>
    <div v-else class="list-wrapper">
      <b-form-input v-model="filter" placeholder="Enter Pokémon ID or name"></b-form-input>
      <vue-scroll :ops="ops">
        <ul>
          <li v-for="(pokemon) in displayList" 
              :key="pokemon.id" v-on:click="handlePokemonClick(pokemon.id)"
              :class="{'active': pokemon.id == clickedId}"><p><span class="pokemon-id">#{{ addLeadingZeros(pokemon.id) }}</span> {{ capitalizeFirstLetter(pokemon.name) }}</p></li>
        </ul>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonList',
  components: {
  },
  props: {
    msg: String
  },
  data() {
    return {
      info: null,
      listLoaded: false,
      clickedId: 0,
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent'
        },
        scrollPanel: {
          easing: 'easeInQuad'
        },
        rail: {},
        bar: {
          background: 'rgb(44, 62, 80)'
        }
      },
      filter: '',
      displayList: null
    }
  },
  mounted() {
    if (this.$store.state.pokemonList.length == 0){
      this.$store.dispatch("fetchPokemonList")
    } else {
      this.displayList = this.$store.state.pokemonList
      this.listLoaded = true
    }
  },
  created() {
    this.$store.subscribe( (mutation) => {
      if (mutation.type === 'appendToList') {
        this.displayList = this.$store.state.pokemonList
        this.listLoaded = true
      }
    })
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    handlePokemonClick(event) {
      this.clickedId = event
      this.$emit('selectPokemon', this.clickedId)
    },
    addLeadingZeros(id) {
      var displayId = ""

      if (id < 10) {
        displayId = "00" + id
      } else if (id < 100) {
        displayId = "0" + id
      } else {
        displayId = id
      }

      return displayId
    },
    /**
     * Check to see if param n is numeric.
     * Used to determine wether an ID or a name
     * has been typed into the searchbox.
     */
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    } 
  },
  computed: {
    isActivePokemon(index) {
      return (this.clickedId == index-1)
    }
  },
  watch: {
    filter(newVal){
      if (newVal.length === 0 && this.listLoaded == true){
        this.displayList = this.$store.state.pokemonList
      } else if (this.isNumeric(newVal)) {
        this.displayList = this.$root._.filter(this.$store.state.pokemonList, function(o) { 
          if (o.id == newVal){
            return o
          }
        })
      } else {
        this.displayList = this.$root._.filter(this.$store.state.pokemonList, function(o) { 
          if (o.name.includes(newVal.toLowerCase())){ // toLowerCase() because all names are lowercase
            return o
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 576px) {  
  .pokemonlist-wrapper{
    height: 87%;
    width: 100%;
    overflow: hidden;
    padding: 0.75em;
  }
}

@media (max-width: 576px) {  
  .pokemonlist-wrapper{
    height: 92%;
    width: 100%;
    overflow: hidden;
    padding: 0.75em;
  }
}

/* .pokemonlist-wrapper{
  height: 92%;
  width: 100%;
  overflow: hidden;
  padding: 0.75em;
} */

.list-wrapper {
  height: 100%;
}

.spinner {
  color: white;
}

ul{
  /* color: #424242; */
  color: white;
  text-align: left;
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin-top: 2%;
  border-top: 1px solid #b3b3b3;
  li{
    border-bottom: 1px solid #383838;
    padding-bottom: 1em;
    padding-top: 1em;
    p{
      margin: 0;
      padding: 0 0 0 0.5em;
    }
  }
  li:hover {
    background: #6ccff7;
    color: white;
  }

  .active {
    background: #02abee;
    color: white;
    -webkit-box-shadow: inset -1px 2px 38px -16px rgba(0,0,0,0.67);
    -moz-box-shadow: inset -1px 2px 38px -16px rgba(0,0,0,0.67);
    box-shadow: inset -1px 2px 38px -16px rgba(0,0,0,0.67);

    .pokemon-id {
      color: white;
    }
  } 
}

.pokemon-id {
  /* background: #383838;
  padding: .25em;
  border-radius: 15px; */
  color: #8f8f8f;
  padding-right: 1em;
  // border: 1px solid #c2c2c2;
}

.card {
  background: #272727;
}

.form-control {
  background: #383838;
  border-color: #272727;
  color: white;
}

.form-control:focus {
  background: #383838;
  border-color: #272727;
  color: white;
}
</style>
