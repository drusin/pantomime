<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import GameView from './GameView.vue';
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <h1>Pantomime</h1>
    <RouterLink to="/play">Los gehts!</RouterLink>
    <RouterLink to="/play">Spieler</RouterLink>
    <RouterLink to="/play">Gallerie</RouterLink>
  </main>
</template>
