<template>
  <div>
    <h1 id="title">List of Pokémon</h1>
    <div class="search-wrapper" style="margin-bottom: 20px;">
      <p>Search a Pokémon by name:</p>
      <input type="text" v-model="search" placeholder="Search Pokemon" />
    </div>
    <table class="table border border-dark rounded">
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
              class="btn btn-primary"
              id="detail-button"
              >Details</router-link
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

.pokemon-row:hover #detail-button {
  display: block;
  opacity: 1;
  transition: all 200ms ease-in-out;
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
