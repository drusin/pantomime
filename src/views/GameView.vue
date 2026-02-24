<script setup lang="ts">
import { useImagesStore } from '@/stores/images';
import { ref } from "vue";
import { useWordsStore } from "@/stores/words.ts";
const store = useImagesStore();
const words = useWordsStore();

const title = words.nextWord();
const image = ref('');
store.getImage(title).then((result) => {
  image.value = result as string;
});
</script>
<template>
  <h2>Spiel läuft!</h2>
  <img :src="image">
  <h3>{{ title }}</h3>
</template>
