<template>
  <div class="container-wrapper">
    <div v-if="pokemonId == 0" class="loading-wrapper">
      <h1>Please select a Pokémon from the left.</h1>
    </div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
    <!-- <div key="details-loading" v-if="!detailsLoaded && pokemonId != 0" class="loading-wrapper">
      <h1>Loading...</h1>
    </div> -->
    <!-- add v-else -->
    <div key="details-loaded" v-if="detailsLoaded && pokemonId != 0" class="details-wrapper">
      <b-row>
        <b-col lg="3">
          <div class="card">
            <img class="pokemon-sprite" :src="loadedPokemon[0].sprites.front_default" :alt="capitalizeFirstLetter(loadedPokemon[0].name)">
          </div>
        </b-col>
        <b-col lg="9">
          <b-row>
            <b-col lg="12">
              <b-row>
                <b-col lg="3">
                  <div class="card">
                    <p class="card-heading">ID</p>
                    <p>#{{ addLeadingZeros(pokemonId) }}</p>
                  </div>
                </b-col>
                <b-col lg="9">
                  <div class="card">
                    <p class="card-heading">Name</p>
                    <p>{{ capitalizeFirstLetter(loadedPokemon[0].name) }}</p>
                  </div>
                </b-col>
              </b-row>
              <b-row style="margin-top: 1.25em;">
                <b-col lg="12">
                  <div class="card">
                    <p class="card-heading">Species</p>
                    <p>{{ loadedPokemon[0].species.genus }}</p>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row style="margin-top: 1.25em;">
            <b-col lg="12">
              <div class="card">
                <p class="card-heading">Types</p>
                <p style="padding: .35em;">
                  <TypeBadge v-if="type1" class="badge left-badge" :type="loadedPokemon[0].types[0].type.name" />
                  <TypeBadge v-if="type2" class="badge" :type="loadedPokemon[0].types[1].type.name" />
                </p>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row style="margin-top: 1.25em;">
        <b-col lg="2">
          <div class="card">
            <p class="card-heading">Weight</p>
            <p>{{ loadedPokemon[0].weight/100 }} kg</p>
          </div>
        </b-col>
        <b-col lg="2">
          <div class="card">
            <p class="card-heading">Height</p>
            <p>{{ loadedPokemon[0].height/10 }} m</p>
          </div>
        </b-col>
        <b-col lg="8">
          <div class="card">
            <p class="card-heading">Flavor text</p>
            <p id="flavor-text">{{ loadedPokemon[0].flavor_text }}</p>
          </div>
        </b-col>
      </b-row>
    </div>
    </transition>
  </div>
</template>

<script>
import TypeBadge from '@/components/TypeBadge.vue'


export default {
  name: 'PokemonDetails',
  components: {
    TypeBadge,
  },
  props: {
    pokemonId: Number,
    pokemonData: Object
  },
  data() {
    return {
      detailsLoaded: false,
      loadedPokemon: {},
      type1: false,
      type2: false,
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
          background: 'rgb(44, 62, 80)',
          onlyShowBarOnScroll: false
        }
      }
    }
  },
  watch: {
    pokemonId: function(newVal) {
      this.displayDetails(newVal)
    },
    loadedPokemon() {
      if (this.loadedPokemon[0].types.length == 1) {
        this.type1 = true;
        this.type2 = false;
      } else if (this.loadedPokemon[0].types.length == 2) {
        this.type1 = true;
        this.type2 = true;
      } else {
        this.type1 = false;
        this.type2 = false;
      }
    }
  },
  created() {
    this.$store.subscribe( (mutation) => {
      if (mutation.type === 'appendToDetailList') {
        if (!this.detailsLoaded){
          var run = true
          var result = []
          do{
            result = this.$store.state.detailList.filter(pokemon => pokemon.id == this.pokemonId)
            if (result.length != 0){
              run = false;
            }
          }while(run)
          this.detailsLoaded = true
          this.loadedPokemon = result
        }
      }
    })

    if (this.pokemonId != 0) {
      this.displayDetails(this.pokemonId)
    }
  },
  methods: {
    displayDetails(pokemonId) {
      this.detailsLoaded = false
      console.log("Pokemon id changed, newval is " + pokemonId)

      let result = this.$store.state.detailList.filter(pokemon => pokemon.id == pokemonId)
      if (result.length != 0) {
        console.log("Pokemon " + pokemonId + " already in store, skipping fetch from api")
        this.loadedPokemon = result
        this.detailsLoaded = true
      } else {
        this.$store.dispatch('fetchPokemonDetailsByID', pokemonId)
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

/* Large devices (desktops, 992px and below) */
@media (max-width: 992px) { 
  .row div {
    margin-top: .25em;
  }
}


.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: .25s;
}

p {
  margin: 0;
  padding: 0;
}

.details-wrapper {
  margin-top: 2em;
}

.wrapper {
  margin: 0;
  padding: 0;
}

.container-wrapper {
  width: 100%;
  height: 100%;
}

.pokemon-sprite {
  width: 100%;
  height: 100%;
}

.card {
  background: #272727;

  .card-heading,
  p {
    font-size: 125%;
    // font-weight: bold;
    color: #8f8f8f;
    text-align: center;
  }

  p {
    font-size: 150%;
    color: white;
  }
}

b-row {
  margin: 0;
  padding: 0;
}

b-col {
  padding: 0;
  margin: 0;
}

.left-badge {
  margin-right: .15em;
}

.badge {
  font-weight: normal;
}

#flavor-text {
  text-align: left;
  font-size: 115%;
  padding: .25em;
}


.grid-container {
  max-height: 100%;
  width: 100%;
  border-radius: 25px;
  text-align: left;
  display: grid;
  grid-template-columns: 1.4fr 0.6fr 1fr 1fr;
  grid-template-rows: 0.2fr 1.4fr 1.1fr 0.9fr 0.1fr minmax(0, 1.4fr);
  gap: 1px 1px;
  grid-template-areas: "Header Header Header Header" "Picture Name Name Name" "Picture Footprint Types Types" ". . HTWT HTWT" ". . . ." "Description Description Description Description";
}

.Footprint { 
  grid-area: Footprint;
  img {
    // margin-left: 38%;
    // margin-top: 38%;
  }
}

.Types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px 1px;
  grid-template-areas: "Type1 Type2";
  grid-area: Types;
  position: relative;
}

.Type1 { 
  grid-area: Type1;
  .badge {
    // position: absolute;
    // bottom: 37%;
  }
}

.Type2 { 
  grid-area: Type2;
  .badge {
    // position: absolute;
    // bottom: 37%;
  }
}

.HTWT {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px 1px;
  grid-template-areas: "HT" "WT";
  grid-area: HTWT;
}

.HT { 
  position: relative;
  grid-area: HT;
  p {
    position: absolute;
    bottom: 0;
  }
}

.WT { grid-area: WT; }

.Name {
  display: grid;
  grid-template-columns: 0.2fr 0.3fr 2.5fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px 1px;
  grid-template-areas: "Pokeball ID Pokemon" "ShortDescription ShortDescription ShortDescription";
  grid-area: Name;
}

.Pokemon {
  grid-area: Pokemon;
  p {
    margin-top: 7%;
    margin-left: 5%;
  }
}

.ShortDescription { 
  grid-area: ShortDescription;
  p {
    margin-top: 2.5%;
    margin-left: 14%;
  }
}

.ID { 
  grid-area: ID; 
  p {
    margin-top: 33%;
    margin-left: 10%;
  }
}

.Pokeball { 
  grid-area: Pokeball;

  p {
    margin-top: 12%;
  }
}

.Picture { 
  grid-area: Picture;
  img {
    width: 100%;
    // height: 100%;
  }
}

.Header { 
  grid-area: Header;
  background: #F23838;
  border-radius: 20px 20px 0 0;
  text-align: center;
  color: white;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
}

.loading {
  background: green;
}

.Description { 
  grid-area: Description; 
  // height: 100%;

  .description-wrapper {
    height: 100%;
    p {
      padding: 1.5%;
      // font-size: 0.8em;
    }
  }
}
</style>
