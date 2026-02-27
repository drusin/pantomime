<script setup lang="ts">
import type { Image } from "@/types.ts";

defineProps<{
  content: Image | null,
}>();
</script>
<template>
  <article class="content">
    <img :src="content?.image">
    <h2>{{ content?.subject }}</h2>
  </article>
</template>
<style scoped>
.content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  flex: 1;
  min-height: 0;
  object-fit: contain;
  display: block;
  max-height: 100%;
}

h2 {
  padding: 2%;
}
</style>
