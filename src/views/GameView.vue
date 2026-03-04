<script setup lang="ts">
import { useImagesStore } from '@/stores/images';
import { onMounted, ref, useTemplateRef, watch, type Ref } from "vue";
import { useWordsStore } from "@/stores/words.ts";
import CardComponent from "@/components/CardComponent.vue";
import type { Image } from "@/types.ts";
import { useGameStore } from "@/stores/game.ts";
import GameSettingsWidget from "@/widgets/GameSettingsWidget.vue";
import SelectPlayersWidget from "@/widgets/SelectPlayersWidget.vue";
import WhoGuessedWidget from '@/widgets/WhoGuessedWidget.vue';
import { useRouter } from 'vue-router';

const imagesStore = useImagesStore();
const wordsStore = useWordsStore();

const subject: Ref<string> = ref('');
const content = ref<Image | null>(null);

const showLoading = ref(false);
watch(subject, async (val) => {
  showLoading.value = true;
  const image = await imagesStore.getImage(val);
  content.value = { subject: val, image }
  showLoading.value = false;
});

subject.value = wordsStore.currentWord;

const router = useRouter();
const gameStore = useGameStore();
const showPicture = ref(false);

function nextWord() {
  if (wordsStore.hasNext && !gameStore.isGameOver) {
    subject.value = wordsStore.nextWord();
    showPicture.value = false;
  }
  else {
    router.push('/gameover');
  }
}

if (!subject.value) {
  nextWord();
}

const gameSettingsWidget = useTemplateRef('game-settings');
onMounted(() => {
  if (!gameStore.gameIsInProgress) {
    console.log(`trying to open ${gameSettingsWidget.value}`);
    gameSettingsWidget.value?.openDialog();
  }
});

const selectPlayersWidget = useTemplateRef('select-players');

const whoGuessedWidget = useTemplateRef('who-guessed');

function badPicture() {
  imagesStore.deleteSavedImage(subject.value);
  nextWord();
}

</script>
<template>
  <div class="container">
    <header>
      <h1>Spiel läuft!</h1>
      <button @click="whoGuessedWidget?.open" v-show="showPicture">Erraten!</button>
    </header>
    <div v-show="!showPicture" class="show-button-container">
      <button @click="() => showPicture = true">Bild zeigen!</button>
    </div>
    <img src="/loader.svg" class="medium-element" v-show="showPicture && showLoading" />
    <CardComponent :content="content" v-show="showPicture && !showLoading"></CardComponent>
    <button class="secondary" v-show="showPicture && !showLoading" @click="badPicture"><img src="/cancel.svg" /></button>
  </div>
  <GameSettingsWidget @next="selectPlayersWidget?.open" ref="game-settings"></GameSettingsWidget>
  <SelectPlayersWidget ref="select-players"></SelectPlayersWidget>
  <WhoGuessedWidget ref="who-guessed" @next="nextWord"></WhoGuessedWidget>
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
