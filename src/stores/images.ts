import { defineStore } from "pinia";
import { deleteImage, findImage, getAllSavedImages as getAllImagesFromDb, saveImage } from "./indexedDbHandler";
import { ref, watch, type Ref } from "vue";
import { generate } from "@/imageGenerator";

const KEY_KEY = 'images.api-key';

export const useImagesStore = defineStore('images', () => {
  const apiKey: Ref<string> = ref(localStorage.getItem(KEY_KEY)! || '');
  watch(apiKey, (val) => localStorage.setItem(KEY_KEY, val));

  if (!apiKey.value) {
    apiKey.value = prompt('Google AI Studio API KEY:') || '';
  }

  async function getImage(subject: string) {
    if (!subject) {
      return '';
    }
    const image = await findImage(subject);
    if (image) {
      return image;
    }
    const result = await generate(subject, apiKey.value);
    saveImage(subject, result);
    return result;
  }

  async function getAllSavedImages() {
    return await getAllImagesFromDb();
  }

  async function deleteSavedImage(subject: string) {
    await deleteImage(subject);
  }

  return {
    getImage, getAllSavedImages, deleteSavedImage
  }
});

