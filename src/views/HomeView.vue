<script setup lang="ts">
import { useWordsStore } from "@/stores/words.ts";

const words = useWordsStore();
words.reset();
</script>

<template>
  <div class="links">
      <RouterLink to="/play">Los gehts!</RouterLink>
      <RouterLink to="/profiles">Spieler</RouterLink>
      <RouterLink to="/gallery">Gallerie</RouterLink>
  </div>
</template>

<style scoped>
.links {
  display: grid;
}
</style>
