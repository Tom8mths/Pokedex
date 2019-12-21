<template>
  <div v-if="hasLoaded">
    <router-link to="/">Voltar</router-link>
    <div class="container">
      <div class="row">
        <div class="card col-md-6 border rounded " style="width: 18rem;">
          <img src="" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">{{ pokemon.Name }} </h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Types: {{ pokemon.Types.join(", ") }}</li>
            <li class="list-group-item">Generation: {{ pokemon.Generation }}</li>
            <li class="list-group-item">Resistance: {{ pokemon.Resistant.join(', ') }}</li>
            <li class="list-group-item">Weaknesses: {{ pokemon.Weaknesses.join(', ') }}</li>
            <li class="list-group-item">Quick attacks: {{ pokemon["Fast Attack(s)"].Name }} </li>
            <li class="list-group-item">Special Attacks: {{ pokemon["Special Attack(s)"].join(', ') }} </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h2>Details</h2>
          <p class="detail-text">{{ pokemon.About }}</p>
        </div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import Vue from "vue";
import axios from 'axios';
import { Component } from "vue-property-decorator";

@Component
export default class Details extends Vue {
  private hasLoaded: boolean = false;
  private pokemon: any = {};
  private pokemons: any[] = [];

  async created() {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json"
      );
      this.pokemons = response.data;

      this.pokemon = this.pokemons.find((p: any) => p.Number == this.$route.params.id);
      this.pokemon.evolutions = [];

      if  (this.pokemon["Next evolution(s)"]) {
        for (const evolution of this.pokemon["Next evolution(s)"]) {
          const pokemonEvolution = this.pokemons.find((p: any) => evolution.Number == p.Number);
          if (pokemonEvolution) this.pokemon.evolutions.push(pokemonEvolution);
        }
      }

      // set attacks to 0 if pokemons doesn't have attacks

      this.hasLoaded = true;
    } catch (err) {
      console.log(err);
    }
    
  }

    clearPokemonsArray(pkmons: any[]) {

    pkmons = pkmons.map(p => {
      p["Generation"] = p["Generation"].replace("Generation", "")
      return p;
    });

    return pkmons;
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./sass/variables.scss";

.Normal { 
  background-color: $normal;
}
.Poison { 
  background-color: $poison;
}

.Fire { 
  background-color: $fire;
}

.Electric {
  background-color: $electric;
}

.Water {
  background-color: $water;
}

.Grass {
  background-color: $grass;
}

.Ice {
  background-color: $ice;
}

.Fighting {
  background-color: $fighting;
}

.Ground {
  background-color: $ground;
}

.Flying {
  background-color: $flying;
}

.Psychic {
  background-color: $psychic;
}

.Bug {
  background-color: $bug;
}

.Rock {
  background-color: $rock;
}

.Ghost {
  background-color: $ghost;
}

.Dragon {
  background-color: $dragon;
}

.Dark {
  background-color: $dark;
}

.Steel {
  background-color: $steel;
}

.Fairy {
  background-color: $fairy;
}


</style>
