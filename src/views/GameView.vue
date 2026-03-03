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

const imagesStore = useImagesStore();
const wordsStore = useWordsStore();

const subject: Ref<string> = ref('');
const content = ref<Image | null>(null);

watch(subject, async (val) => {
  const image = await imagesStore.getImage(val);
  content.value = { subject: val, image }
});

subject.value = wordsStore.currentWord;

function nextWord() {
  subject.value = wordsStore.nextWord();
}

if (!subject.value) {
  nextWord();
}

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

const whoGuessedWidget = useTemplateRef('who-guessed');

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
    <CardComponent :content="content" v-show="showPicture"></CardComponent>
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
