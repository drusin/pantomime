<script setup lang="ts">
import { useWordsStore } from "@/stores/words.ts";

const words = useWordsStore();
words.reset();
</script>

<template>
  <header class="container">Pantomime</header>
  <main class="container">
    <div class="links">
        <RouterLink to="/play">Los gehts!</RouterLink>
        <RouterLink to="/profiles">Spieler</RouterLink>
        <RouterLink to="/gallery">Gallerie</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.links {
  display: grid;
}
</style>
