<script setup lang="ts">
import { useWordsStore } from "@/stores/words.ts";
import { useGameStore } from "@/stores/game.ts";
import { useImagesStore } from "@/stores/images";

useImagesStore(); //ask for API key if necessary

const words = useWordsStore();
words.reset();
const gameStore = useGameStore();
gameStore.reset();
</script>

<template>
  <div class="container">
    <header><h1>Pantomime</h1></header>
    <main>
      <div class="links">
        <RouterLink class="link" to="/play"><img class="small-element" src="/player-play.svg" /> Los gehts!</RouterLink>
        <RouterLink class="link" to="/profiles"><img class="small-element" src="/address-book.svg" /> Spieler</RouterLink>
        <RouterLink class="link" to="/gallery"><img class="small-element" src="/cards.svg" /> Gallerie</RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>

.links {
  display: grid;
  padding: 1rem;
}

.link {
  font-size: 2rem;
  padding: 1rem;
}
</style>
