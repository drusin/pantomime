<script setup lang="ts">
import { getAllSavedImages } from '@/stores/indexedDbHandler';
import { ref } from 'vue';

const images = ref<Array<object>>([]);
getAllSavedImages().then((result) => images.value = result);
</script>
<template>
  <h1>Gallerie</h1>
  <div class="container">
    <img v-for="image in images" :src="image.image" />
  </div>
</template>
