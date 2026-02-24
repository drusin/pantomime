import { defineStore } from "pinia";
import allWords from "@/words/allWords.ts";
import { computed, ref, type Ref, watch } from "vue";

const USED_KEY = 'words.used';

export const useWordsStore = defineStore('words', () => {
  const used: Ref<Array<string>> = ref(JSON.parse(localStorage.getItem(USED_KEY)!) || []);
  watch(used.value, (val) => localStorage.setItem(USED_KEY, JSON.stringify(val)));

  const hasNext = computed(() => used.value.length < allWords().length);

  function reset() {
    used.value.length = 0;
  }

  function nextWord() {
    const all = allWords();
    if (used.value.length === all.length) {
      return '';
    }
    let word = '';
    do {
      const i = Math.floor(Math.random() * all.length);
      word = all[i] || '';
    } while (!word || used.value.some((el) => el === word));
    used.value.push(word);
    return word;
  }

  return {
    used, hasNext, reset, nextWord
  }
});
