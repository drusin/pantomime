<script setup lang="ts">
import { useTemplateRef } from "vue";

defineExpose({ close });

const dialog = useTemplateRef('dialog');
function close() {
  dialog.value?.close()
}
</script>

<template>
<dialog ref="dialog">
  <article>
    <header>Wann ist das Spiel vorbei?</header>
    <fieldset>
      <label>
        <input type="radio" name="setting">
        <img class="small-element" src="/cards.svg" />
        Wenn so viele Karten gespielt wurden:
        <input class="not-full-width" type="number">
      </label>
      <label>
        <input type="radio" name="setting">
        <img class="small-element" src="/crown.svg" />
        Wenn jemand so viele Punkte hat:
        <input class="not-full-width" type="number">
      </label>
    </fieldset>
    <button>Weiter</button>
  </article>
</dialog>
</template>

<style scoped>
.not-full-width {
  width: 10rem;
}
</style>
