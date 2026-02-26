<script setup lang="ts">
import { useWordsStore } from "@/stores/words.ts";

const words = useWordsStore();
words.reset();
</script>

<template>
  <div class="container">
    <header><h1>Pantomime</h1></header>
    <main>
      <div class="links">
        <RouterLink to="/play">Los gehts!</RouterLink>
        <RouterLink to="/profiles">Spieler</RouterLink>
        <RouterLink to="/gallery">Gallerie</RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
.links {
  display: grid;
}
</style>
