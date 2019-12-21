<template>
  <div v-if="hasLoaded">
    <router-link to="/" class="btn btn-secondary"><i class="fa fa-arrow-left" aria-hidden="true"></i> Go Back</router-link>
    <div class="container">
      <div class="row">
        <h2>Pokemon</h2>
        <div
          class="card col-md-12 border rounded "
          style="width: 18rem;"
          :class="[pokemon.Types[0]]"
        >
          <img src="" class="card-img-top" alt="" />
          <div class="card-body">
            <h3 class="card-title">{{ pokemon.Name }}</h3>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <b>Types:</b> {{ pokemon.Types.join(", ") }}
            </li>
            <li class="list-group-item">
              <b>Generation:</b> {{ pokemon.Generation }}
            </li>
            <li class="list-group-item">
              <b>Resistance:</b> {{ pokemon.Resistant.join(", ") }}
            </li>
            <li class="list-group-item">
              <b>Weaknesses:</b> {{ pokemon.Weaknesses.join(", ") }}
            </li>
            <li class="list-group-item">
              <b>Quick attacks: </b>
              <span
                v-for="(attack, index) in pokemon['Fast Attack(s)']"
                :key="index"
                ><span v-if="index > 0">, </span>{{ attack.Name }}</span
              >
            </li>
            <li class="list-group-item">
              <b>Special Attacks: </b>
              <span
                v-for="(attack, index) in pokemon['Special Attack(s)']"
                :key="index"
                ><span v-if="index > 0">, </span>{{ attack.Name }}</span
              >
            </li>
            <li class="list-group-item">{{ pokemon.About }}</li>
          </ul>
        </div>
        <h2>Evolutions</h2>
        <div
          class="card col-md-12 border rounded"
          style="width: 18rem;"
          v-for="evolution in pokemon.evolutions"
          :key="evolution.Number"
          :class="[evolution.Types[0]]"
        >
          <img src="" class="card-img-top" alt="" />
          <div class="card-body">
            <h3 class="card-title">{{ evolution.Name }}</h3>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <b>Types:</b> {{ evolution.Types.join(", ") }}
            </li>
            <li class="list-group-item">
              <b>Generation:</b> {{ evolution.Generation }}
            </li>
            <li class="list-group-item">
              <b>Resistance:</b> {{ evolution.Resistant.join(", ") }}
            </li>
            <li class="list-group-item">
              <b>Weaknesses:</b> {{ evolution.Weaknesses.join(", ") }}
            </li>
            <li class="list-group-item">
              <b>Quick attacks: </b>
              <span
                v-for="(attack, index) in evolution['Fast Attack(s)']"
                :key="index"
                ><span v-if="index > 0">, </span>{{ attack.Name }}</span
              >
            </li>
            <li class="list-group-item">
              <b>Special Attacks: </b>
              <span
                v-for="(attack, index) in evolution['Special Attack(s)']"
                :key="index"
                ><span v-if="index > 0">, </span>{{ attack.Name }}</span
              >
            </li>
            <li class="list-group-item">{{ evolution.About }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
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

      this.pokemon = this.pokemons.find(
        (p: any) => p.Number == this.$route.params.id
      );
      this.pokemon.evolutions = [];

      if (this.pokemon["Next evolution(s)"]) {
        for (const evolution of this.pokemon["Next evolution(s)"]) {
          const pokemonEvolution = this.pokemons.find(
            (p: any) => evolution.Number == p.Number
          );
          if (pokemonEvolution) this.pokemon.evolutions.push(pokemonEvolution);
        }
      }

      // set attacks to 0 if pokemons doesn't have attacks

      this.hasLoaded = true;
    } catch (err) {
      alert('error');
    }
  }

  clearPokemonsArray(pkmons: any[]) {
    pkmons = pkmons.map(p => {
      p["Generation"] = p["Generation"].replace("Generation", "");
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
