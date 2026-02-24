import { defineStore } from "pinia";
import gateway from "./gateway";
import { findImage, saveImage } from "./indexedDbHandler";

export const useImagesStore = defineStore('images', {
  actions: {
    async getImage(subject: string) {
      if (!subject) {
        return '';
      }
      const image = await findImage(subject);
      if (image) {
        return image;
      }
      const result = await gateway.generatePicture(subject);
      saveImage(subject, result);
      return result;
    }
  }
});

