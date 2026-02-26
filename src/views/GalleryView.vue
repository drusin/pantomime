<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import type { Image } from "@/types.ts";
import CardComponent from "@/components/CardComponent.vue";
import PictureWidget from "@/components/PictureWidget.vue";
import { useImagesStore } from "@/stores/images.ts";

const images = ref<Array<Image>>([]);
const imageStore = useImagesStore();
async function refresh() {
  images.value = await imageStore.getAllSavedImages();
}
refresh();

const pictureWidget = useTemplateRef('picture-widget');
function openWidget(image: Image) {
  pictureWidget.value?.open(image.image, image.subject, image.subject);
}
async function imageDeleted(subject: string) {
  await imageStore.deleteSavedImage(subject);
  await refresh();
}
</script>
<template>
  <div class="container">
    <h1>Gallerie</h1>
    <div class="container card-container">
      <div class="card" v-for="image in images" :key="image.subject">
        <CardComponent :content="image" @click="openWidget(image)"></CardComponent>
      </div>
    </div>
  </div>
  <PictureWidget ref="picture-widget" @delete="(id) => imageDeleted(id)"></PictureWidget>
</template>
<style scoped>
.card-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  width: 30vh;
  margin: 1rem;
}
</style>
