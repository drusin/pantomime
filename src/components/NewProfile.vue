<script setup lang="ts">
import { useTemplateRef } from "vue";
import { useProfileStore } from "@/stores/profiles.ts";

const dialog = useTemplateRef('dialog');
const openDialog = () => dialog.value?.showModal();
const close = () => dialog.value?.close();

defineExpose({
  openDialog,
});

const emit = defineEmits<{
  profileCreated: [id: number],
}>();

const profileStore = useProfileStore();
const fileSelected = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0] as File;
  if (!file) {
    return;
  }
  const base64 = await fileToBase64(file);
  const profile = await profileStore.createProfile(base64);
  input.value = '';
  emit('profileCreated', profile.id);
  close();
}

async function fileToBase64(file: File): Promise<string> {
  const reader = new FileReader();
  const promise = new Promise<string>((resolve) => reader.onload = (e) => resolve(e.target?.result as string));
  reader.readAsDataURL(file);
  return promise;
}

</script>

<template>
<dialog ref="dialog">
  <article>
    <header>
      <button aria-label="Close" rel="prev" @click="close"></button>
      <p>
        <strong>Spieler erstellen</strong>
      </p>
    </header>
    <div>
      <input type="file" @change="fileSelected">
    </div>
  </article>
</dialog>
</template>

<style scoped>
img {
  width: 64px;
  height: 64px;
}
</style>
