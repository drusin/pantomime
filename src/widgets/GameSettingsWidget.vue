<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import { ref, useTemplateRef } from "vue";

defineExpose({ close, openDialog });
const emit = defineEmits([ 'next' ]);

const dialog = useTemplateRef('dialog');
function close() {
  dialog.value?.close()
}
function openDialog() {
  dialog.value?.showModal();
}

const gameStore = useGameStore();
const gameType = ref(gameStore.gameSettings.condition);
const amount = ref(gameStore.gameSettings.amount);

function next() {
  gameStore.gameSettings.condition = gameType.value;
  gameStore.gameSettings.amount = amount.value;
  close();
  emit('next');
}

</script>

<template>
<dialog ref="dialog" open>
  <article>
    <header>Wann ist das Spiel vorbei?</header>
    <fieldset>
      <label>
        <input type="radio" name="setting" value="AMOUNT_CARDS" v-model="gameType">
        <img class="small-element" src="/cards.svg" />
        Wenn so viele Karten gespielt wurden:
      </label>
      <label>
        <input type="radio" name="setting" value="AMOUNT_WINS" v-model="gameType">
        <img class="small-element" src="/crown.svg" />
        Wenn jemand so viele Punkte hat:
      </label>
    </fieldset>
    <input type="number" v-model="amount">
    <button @click="next">Weiter</button>
  </article>
</dialog>
</template>

<style scoped>
.not-full-width {
  width: 10rem;
}
</style>
