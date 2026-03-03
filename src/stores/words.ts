import { defineStore } from "pinia";
import allWords from "@/words/allWords.ts";
import { computed, ref, type Ref, watch } from "vue";

const USED_KEY = 'words.used';
const CURRENT_KEY = 'words.current';

export const useWordsStore = defineStore('words', () => {
  const used: Ref<Array<string>> = ref(JSON.parse(localStorage.getItem(USED_KEY)!) || []);
  watch(used.value, (val) => localStorage.setItem(USED_KEY, JSON.stringify(val)));
  const currentWord: Ref<string> = ref(localStorage.getItem(CURRENT_KEY)! || '');
  watch(currentWord, (val) => localStorage.setItem(CURRENT_KEY, val));

  const hasNext = computed(() => used.value.length < allWords().length);

  function reset() {
    used.value.length = 0;
    currentWord.value = '';
  }

  function nextWord() {
    const all = allWords();
    if (used.value.length === all.length) {
      currentWord.value = ''
    }
    do {
      const i = Math.floor(Math.random() * all.length);
      currentWord.value = all[i] || '';
    } while (!currentWord.value || used.value.some((el) => el === currentWord.value));
    used.value.push(currentWord.value);
    return currentWord.value;
  }

  return {
    used, currentWord, hasNext, reset, nextWord
  }
});
