<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>();
defineExpose({ open });

const dialog = useTemplateRef('dialog');

const picture = ref('');
let id = '';
const title = ref('');
function open(pictureToShow: string, idToEmit: string, titleToShow = '') {
  picture.value = pictureToShow;
  id = idToEmit;
  title.value = titleToShow;
  dialog.value?.showModal();
}
function close() {
  dialog.value?.close();
}
function deletePressed() {
  emit('delete', id);
  close();
}
</script>

<template>
<dialog ref="dialog">
  <article>
    <header>
      <button aria-label="Close" rel="prev" @click="close"></button>
      <p>
        <strong>{{ title }}</strong>
      </p>
    </header>
    <div>
      <img :src="picture" />
      <button @click="deletePressed"><img src="/trash.svg" /></button>
    </div>
  </article>
</dialog>
</template>

<style scoped>
</style>
