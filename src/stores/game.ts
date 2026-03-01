import { defineStore } from "pinia";
import { computed, ref, type Ref, watch } from "vue";
import type { GameSettings } from "@/types.ts";

const PLAYERS_KEY = 'game.players';
const SCORES_KEY = "game.scores";
const STATE_KEY = 'game.state';
const SETTINGS_KEY = 'game.settings';
const AMOUNT_PLAYED_KEY = 'game.played';

export const useGameStore = defineStore('game', () => {
  const currentPlayers: Ref<Array<number>> = ref(JSON.parse(localStorage.getItem(PLAYERS_KEY)!) || []);
  watch(currentPlayers.value, (val) => localStorage.setItem(PLAYERS_KEY, JSON.parse(currentPlayers.value));
  const currentState: Ref<Map<number, number>> = ref(JSON.parse(localStorage.getItem(STATE_KEY)!) || new Map());
  watch(currentState.value, (val) => localStorage.setItem(STATE_KEY, JSON.stringify(val)));
  const gameSettings: Ref<GameSettings> = ref(JSON.parse(localStorage.getItem(SETTINGS_KEY)!) || {
    condition: 'AMOUNT_CARDS',
    amount: 20
  });
  watch(gameSettings.value, (val) => localStorage.setItem(SETTINGS_KEY, JSON.stringify(val)));
  const amountPlayed: Ref<number> = ref(parseInt(localStorage.getItem(AMOUNT_PLAYED_KEY)!) || 0);
  watch(amountPlayed, (val) => localStorage.setItem(AMOUNT_PLAYED_KEY, val.toString()));

  // eslint-disable-next-line vue/return-in-computed-property
  const isGameOver = computed(() => {
    switch (gameSettings.value.condition) {
      case 'AMOUNT_CARDS':
        return amountPlayed.value >= gameSettings.value.amount;
      case 'AMOUNT_WINS':
        const arr = [... currentState.value.values()];
        return arr.some((val: number) => val >= gameSettings.value.amount);
    }
  });

  const getWinner= computed(() => {
    const arr = [...currentState.value.entries()];
    const sorted = arr.sort((left, right) => left[1] - right[1]);
    return sorted.filter((val) => val[1] === sorted[0]![1])
      .map((val) => val[0]);
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
