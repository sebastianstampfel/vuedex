<template>
  <b-row style="max-height: 100%;" v-if='mobileOptimized'>
    <b-col style="max-height: 100vh;" v-if="showList">
      <PokemonList @selectPokemon="selectedPokemon = $event" />
    </b-col>
    <b-col v-if="showDetails">
      <b-button @click="handleBackButtonClick" variant="danger"><font-awesome-icon icon="arrow-left" /></b-button>
      <PokemonDetails :pokemonId="selectedPokemon" />
    </b-col>
  </b-row>
  <b-row v-else class="wrapper">
    <b-col class="list-col" cols="4">
      <h2>Pokémon list</h2>
      <PokemonList @selectPokemon="selectedPokemon = $event" />
    </b-col>
    <b-col cols="8">
      <h2>Pokémon details</h2>
      <PokemonDetails :pokemonId="selectedPokemon" />
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import PokemonDetails from '@/components/PokemonDetails.vue'
import PokemonList from '@/components/PokemonList.vue'

export default {
  name: 'Home',
  components: {
    PokemonDetails,
    PokemonList
  },
  data() {
    return {
      selectedPokemon: 0,
      mobileOptimized: false,
      showList: true,
      showDetails: false
    }
  },
  methods: {
    handleBackButtonClick() {
      this.showDetails = false
      this.showList = true
    }
  },
  computed: {
      media() {
          return {
              'is-xs': this.$screen.xs,
              'is-phone': this.$screen.sm,
              'is-tablet': this.$screen.md,
              'is-desktop': this.$screen.lg,
              'can-touch': this.$screen.touch,
              'breakpoint': this.$screen.breakpoint,
          };
      }
  },
  watch: {
      '$screen.width'() {
          if (this.$screen.breakpoint == "xs") {
            this.mobileOptimized = true
          } else {
            this.mobileOptimized = false
          }
      },
      selectedPokemon(newVal) {
        console.log(`Selected ${newVal}`)
        if (this.mobileOptimized) {
          if (this.showList) {
            this.showList = false
            this.showDetails = true
          }
        }
      }
  },
  created() {
    if (this.$screen.breakpoint == "xs") {
      this.mobileOptimized = true
    } else {
      this.mobileOptimized = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper,
.list-col {
  height: 100vh;
}

.btn-danger {
  background-color: transparent !important;
  color: #dc3545;
}
</style>
