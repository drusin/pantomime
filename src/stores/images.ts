import { defineStore } from "pinia";
import gateway from "./gateway";

export const useImagesStore = defineStore('images', {
  state: () => {
    return {
      images: new Map<string, string>(),
    }
  },
  actions: {
    async getImage(subject: string) {
      if (this.images.has(subject)) {
        return Promise.resolve(this.images.get(subject));
      }
      const result = await gateway.generatePicture(subject);
      this.images.set(subject, result);
      return result;
    }
  }
});

function getFromIndexedDb(subject: string) {

}
