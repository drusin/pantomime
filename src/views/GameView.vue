<script setup lang="ts">
import { useImagesStore } from '@/stores/images';
import { onMounted, ref, useTemplateRef } from "vue";
import { useWordsStore } from "@/stores/words.ts";
import CardComponent from "@/components/CardComponent.vue";
import type { Image } from "@/types.ts";
import { useGameStore } from "@/stores/game.ts";
import GameSettingsWidget from "@/widgets/GameSettingsWidget.vue";
import SelectPlayersWidget from "@/widgets/SelectPlayersWidget.vue";

const imagesStore = useImagesStore();
const wordsStore = useWordsStore();

const title = wordsStore.nextWord();
const content = ref<Image | null>(null);
imagesStore.getImage(title).then((result) => {
  content.value = { subject: title, image: result };
});

const gameSettingsWidget = useTemplateRef('game-settings');
const gameStore = useGameStore();
onMounted(() => {
  if (!gameStore.gameIsInProgress) {
    console.log(`trying to open ${gameSettingsWidget.value}`);
    gameSettingsWidget.value?.openDialog();
  }
});

const showPicture = ref(false);
const selectPlayersWidget = useTemplateRef('select-players');
</script>
<template>
  <div class="container">
    <header>
      <h1>Spiel läuft!</h1>
      <button>Erraten!</button>
    </header>
    <div v-show="!showPicture" class="show-button-container">
      <button @click="() => showPicture = true">Bild zeigen!</button>
    </div>
    <CardComponent :content="content" v-show="showPicture"></CardComponent>
  </div>
  <GameSettingsWidget @next="selectPlayersWidget?.open" ref="game-settings"></GameSettingsWidget>
  <SelectPlayersWidget ref="select-players"></SelectPlayersWidget>
</template>
<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
}

.show-button-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    height: 50%;
    width: 50%
  }
}
</style>
