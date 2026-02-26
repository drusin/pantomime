<script setup lang="ts">
import { getAllSavedImages } from '@/stores/indexedDbHandler';
import { ref } from 'vue';
import type { Image } from "@/types.ts";
import CardComponent from "@/components/CardComponent.vue";

const images = ref<Array<Image>>([]);
getAllSavedImages().then((result) => images.value = result);
</script>
<template>
  <div class="container">
    <h1>Gallerie</h1>
    <div class="container card-container">
      <div class="card" v-for="image in images" :key="image.subject">
        <CardComponent :content="image"></CardComponent>
      </div>
<!--      <img v-for="image in images" :key="image.subject" :src="image.image"/>-->
    </div>
  </div>
</template>
<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  width: 30vh;
  margin: 1rem;
}
</style>
