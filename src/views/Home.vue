<template>
  <div class="home">
    <Pokelist />
  </div>
</template>

<script>
// @ is an alias to /src
import Pokelist from "@/components/Pokelist.vue";

export default {
  name: "home",
  components: {
    Pokelist
  }
};
</script>
