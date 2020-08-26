<template>
  <div class="type-badge" :class="type">
    <p>{{ type }}</p>
  </div>
</template>

<script>
export default {
  name: 'TypeBadge',
  props: {
    type: String
  },
  data() {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.type-badge {
  color: white;
  width: 50%;
  border-radius: 20px;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  -khtml-border-radius: 20px;
  -icab-border-radius: 20px;
  -o-border-radius: 20px;
  p {
    text-align: center;
    text-transform: capitalize;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
}

.poison {
  background: #A040A0;
  border: 1px solid #682A68;
}

.normal {
  background: #A8A878;
  border: 1px solid #6D6D4E;
}

.fighting {
  background: #C03028;
  border: 1px solid #7D1F1A;
}

.flying {
  background: #A890F0;
  border: 1px solid #6D5E9C;
}

.ground {
  background: #E0C068;
  border: 1px solid #927D44;
}

.rock {
  background: #B8A038;
  border: 1px solid #786824;
}

.bug {
  background: #A8B820;
  border: 1px solid #6D7815;
}

.ghost {
  background: #705898;
  border: 1px solid #493963;
}

.steel {
  background: #B8B8D0;
  border: 1px solid #787887;
}

.fire {
  background: #F08030;
  border: 1px solid #9C531F;
}

.water {
  background: #6890F0;
  border: 1px solid #445E9C;
}

.grass {
  background: #78C850;
  border: 1px solid #4E8234;
}

.electric {
  background: #F8D030;
  border: 1px solid #A1871F;
}

.psychic {
  background: #F85888;
  border: 1px solid #A13959;
}

.ice {
  background: #98D8D8;
  border: 1px solid #638D8D;
}

.dragon {
  background: #7038F8;
  border: 1px solid #4924A1;
}

.dark {
  background: #705848;
  border: 1px solid #49392F;
}

.fairy {
  background: #EE99AC;
  border: 1px solid #9B6470;
}

.unknown {
  background: #68A090;
  border: 1px solid #44685E;
}
</style>
