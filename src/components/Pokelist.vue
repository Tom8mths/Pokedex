<template>
  <div>
    <h1 id="title">List of Pokémon</h1>
    <h5>Search your pokemon:</h5>
    <label for="inp" class="inp">
      <input type="text" v-model="search" id="inp" placeholder=".">
      <span class="label">Pokemon Name</span>
      <span class="border"></span>
    </label>
    <table class="table borderless">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Generation</th>
          <th scope="col">Atk. Qty.</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="pokemon-row"
          v-for="pokemon in pokemonList"
          :key="pokemon.Number"
          :class="[pokemon.Types[0]]"
        >
          <th scope="row">{{ pokemon.Generation }}</th>
          <td>
            {{
              pokemon["Special Attack(s)"].length +
                pokemon["Fast Attack(s)"].length
            }}
          </td>
          <td>{{ pokemon.Name }}</td>
          <td>{{ pokemon.Types.join(", ") }}</td>
          <td>
            <router-link 
              :to="{ name: 'details', params: { id: pokemon.Number } }"
              tag="button"
              class="btn btn-dark"
              id="detail-button"
              ><i class="fa fa-info" aria-hidden="true"></i> Details</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import Component from "vue-class-component";

@Component({ name: "Pokelist" })
export default class Pokelist extends Vue {
  private pokemons: any[] = [];
  private search: string = "";

  get pokemonList() {
    return this.pokemons.filter(pokemon => {
      return (
        pokemon.Name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    });
  }

  async created() {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json"
      );
      this.pokemons = this.clearPokemonsArray(response.data);
    } catch (err) {
      alert('error');
    }
  }

  clearPokemonsArray(pkmons: any[]) {
    // remove pokemons that doesn't have a name
    pkmons = pkmons.filter(p => {
      if (!p.Name) return false;
      return true;
    });

    // set attacks to 0 if pokemons doesn't have attacks
    pkmons = pkmons.map(p => {
      if (!p["Special Attack(s)"]) p["Special Attack(s)"] = 0;
      if (!p["Fast Attack(s)"]) p["Fast Attack(s)"] = 0;
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

table {
  margin: 0 auto;
  width: 50%;
}


// INPUT

html,
body {
  height: 100%;
}
body {
  display: grid;
  font-family: Avenir;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
}
* {
  box-sizing: border-box;
}
.inp {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
  margin-bottom: 20px;
}
.inp .label {
  position: absolute;
  top: 16px;
  left: 0;
  font-size: 16px;
  color: #9098a9;
  font-weight: 500;
  transform-origin: 0 0;
  transition: all 0.2s ease;
}
.inp .border {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: #07f;
  transform: scaleX(0);
  transform-origin: 0 0;
  transition: all 0.15s ease;
}
.inp input {
  -webkit-appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 12px 0;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid #c8ccd4;
  background: none;
  border-radius: 0;
  color: #223254;
  transition: all 0.15s ease;
}
.inp input:hover {
  background: rgba(34,50,84,0.03);
}
.inp input:not(:placeholder-shown) + span {
  color: #5a667f;
  transform: translateY(-26px) scale(0.75);
}
.inp input:focus {
  background: none;
  outline: none;
}
.inp input:focus + span {
  color: #07f;
  transform: translateY(-26px) scale(0.75);
}
.inp input:focus + span + .border {
  transform: scaleX(1);
}



// 

.pokemon-row:hover #detail-button {
  opacity: 1;
  transition: all 200ms ease-in-out;
}

.pokemon-row:hover {
  transition: all 250ms ease-in-out;
  background-image: linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) );
}

#detail-button {
  opacity: 0;
  transition: all 200ms ease-in-out;
  font-size: 15px;
}

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
