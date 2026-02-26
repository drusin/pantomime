<script setup lang="ts">
import { useImagesStore } from '@/stores/images';
import { ref } from "vue";
import { useWordsStore } from "@/stores/words.ts";
import CardComponent from "@/components/CardComponent.vue";
import type { Image } from "@/types.ts";

const store = useImagesStore();
const words = useWordsStore();

const title = words.nextWord();
const content = ref<Image | null>(null);
store.getImage(title).then((result) => {
  content.value = { subject: title, image: result };
});
</script>
<template>
  <div class="container">
    <header><h1>Spiel läuft!</h1></header>
   <CardComponent :content="content"></CardComponent>
  </div>
</template>
<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
