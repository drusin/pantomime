import { defineStore } from 'pinia';
import { computed, ref, type Ref, watch } from 'vue';
import type { GameSettings } from '@/types.ts';

const PLAYERS_KEY = 'game.players';
const SCORES_KEY = 'game.scores';
const SETTINGS_KEY = 'game.settings';
const AMOUNT_PLAYED_KEY = 'game.played';

export const useGameStore = defineStore('game', () => {
  const currentPlayers: Ref<Array<number>> = ref(JSON.parse(localStorage.getItem(PLAYERS_KEY)!) || []);
  watch(currentPlayers.value, (val) => localStorage.setItem(PLAYERS_KEY, JSON.stringify(val)));
  const currentScore: Ref<Array<number>> = ref(JSON.parse(localStorage.getItem(SCORES_KEY)!) || []);
  watch(currentScore.value, (val) => localStorage.setItem(SCORES_KEY, JSON.stringify(val)));
  const gameSettings: Ref<GameSettings> = ref(JSON.parse(localStorage.getItem(SETTINGS_KEY)!) || {
    condition: 'AMOUNT_CARDS',
    amount: 20
  });
  watch(gameSettings.value, (val) => localStorage.setItem(SETTINGS_KEY, JSON.stringify(val)));
  const amountPlayed: Ref<number> = ref(parseInt(localStorage.getItem(AMOUNT_PLAYED_KEY)!) || 0);
  watch(amountPlayed, (val) => localStorage.setItem(AMOUNT_PLAYED_KEY, val.toString()));

  const gameIsInProgress = computed(() => currentPlayers.value.length > 0);

  const isGameOver = computed(() => {
    switch (gameSettings.value.condition) {
      case 'AMOUNT_CARDS':
        return amountPlayed.value >= gameSettings.value.amount;
      case 'AMOUNT_WINS':
        return currentScore.value.some((val) => val >= gameSettings.value.amount);
      default:
        return false;
    }
  });

  const getWinner = computed(() => {
    const winners = [];
    for (let i = 0; i <= currentScore.value.length; i++) {
      if (currentScore.value[i] || -1 >= gameSettings.value.amount) {
        winners.push(currentPlayers.value[i]);
      }
    }
    return winners;
  });

  function setPlayers(ids: Array<number>) {
    currentPlayers.value.length = 0;
    currentScore.value.length = 0;
    for (const id of ids) {
      currentPlayers.value.push(id);
      currentScore.value.push(0);
    }
  }

  function addPoint(playerId: number) {
    const index = currentPlayers.value.indexOf(playerId);
    currentScore.value[index] = (currentScore.value[index] || 0) + 1;
    amountPlayed.value++;
  }

  function reset() {
    currentPlayers.value.length = 0;
    currentScore.value.length = 0;
    amountPlayed.value = 0;
  }

  return {
    currentPlayers,
    currentScore,
    gameSettings,
    amountPlayed,
    isGameOver,
    getWinner,
    gameIsInProgress,
    setPlayers,
    addPoint,
    reset,
  }
})
