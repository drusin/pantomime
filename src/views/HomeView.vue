<script setup lang="ts">
import { useWordsStore } from "@/stores/words.ts";
import { useGameStore } from "@/stores/game.ts";
import { useImagesStore } from "@/stores/images";

useImagesStore(); //ask for API key if necessary

const words = useWordsStore();
words.reset();
const gameStore = useGameStore();
gameStore.reset();

function requestFullscreen() {
  document.documentElement.requestFullscreen();
}
</script>

<template>
  <div class="container">
    <header>
      <h1>Pantomime</h1>
      <button @click="requestFullscreen"><img src="/arrows-maximize.svg" /></button>
    </header>
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
header {
  display: flex;
  justify-content: space-between;
}

.links {
  display: grid;
  padding: 1rem;
}

.link {
  font-size: 2rem;
  padding: 1rem;
}
</style>
