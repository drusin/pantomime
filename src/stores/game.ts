import { defineStore } from "pinia";
import { computed, ref, type Ref, watch } from "vue";
import type { GameSettings } from "@/types.ts";

const STATE_KEY = 'game.state';
const SETTINGS_KEY = 'game.settings';
const AMOUNT_PLAYED_KEY = 'game.played';

export const useGameStore = defineStore('gameStore', () => {
  const currentState: Ref<Map<number, number>> = ref(JSON.parse(localStorage.getItem(STATE_KEY)!) || new Map());
  watch(currentState.value, (val) => localStorage.setItem(STATE_KEY, JSON.stringify(val)));
  const gameSettings: Ref<GameSettings> = ref(JSON.parse(localStorage.getItem(SETTINGS_KEY)!) || {
    condition: 'AMOUNT_CARDS',
    amount: 20
  });
  watch(gameSettings.value, (val) => localStorage.setItem(STATE_KEY, JSON.stringify(val)));
  const amountPlayed: Ref<number> = ref(parseInt(localStorage.getItem(AMOUNT_PLAYED_KEY)!) || 0);
  watch(amountPlayed, (val) => localStorage.setItem(AMOUNT_PLAYED_KEY, val.toString()));

  // eslint-disable-next-line vue/return-in-computed-property
  const isGameOver = computed(() => {
    switch (gameSettings.value.condition) {
      case 'AMOUNT_CARDS':
        return amountPlayed.value >= gameSettings.value.amount;
      case 'AMOUNT_WINS':
        return currentState.value.values().some((val: number) => val >= gameSettings.value.amount);
    }
  });

  const getWinner= computed(() => {
    const sorted: Array<{key: number, value: number}> = currentState.value.entries().toArray().sort((left, right) => left.amount - right.amount);
    return sorted.filter((val) => val.value === sorted[0]!.value)
      .map((val) => val.key);
  });

  function setPlayers(ids: Array<number>) {
    ids.forEach((id) => currentState.value.set(id, 0));
  }

  function addPoint(playerId: number) {
    currentState.value.set(playerId, 1 + currentState.value.get(playerId)!);
    amountPlayed.value++;
  }

  function reset() {
    currentState.value = new Map();
    amountPlayed.value = 0;
  }

  return {
    currentState,
    gameSettings,
    amountPlayed,
    isGameOver,
    getWinner,
    setPlayers,
    addPoint,
    reset,
  }
})
