<script setup lang="ts">
import { nextWord } from '@/words/nextWord';
import { useImagesStore } from '@/stores/images';
const store = useImagesStore();

const title = nextWord();
const image = await store.getImage(title);
</script>
<template>
  <h2>Spiel läuft!</h2>
  <img :src="image">
  <h3>{{ title }}</h3>
</template>
