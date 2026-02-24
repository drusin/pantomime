import { defineStore } from "pinia";
import allWords from "@/words/allWords.ts";

export const useWordsStore = defineStore('words', {
  state: () => {
    return {
      used: [] as Array<string>,
    };
  },
  actions: {
    reset() {
      this.used.length = 0;
    },
    nextWord() {
      const all = allWords();
      if (this.used.length === all.length) {
        return '';
      }
      let word = '';
      do {
        const i = Math.floor(Math.random() * all.length);
        word = all[i] || '';
      } while (!word && !this.used.find((w) => w === word));
      this.used.push(word);
      return word;
    }
  },
  getters: {
    hasNext: (state) => state.used.length < allWords().length,
  }
});
