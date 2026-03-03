<script setup lang="ts">

import { useProfileStore } from "@/stores/profiles.ts";
import { computed, ref, type Ref, useTemplateRef, watch } from "vue";
import type { Profile } from "@/types.ts";
import AvatarComponent from "@/components/AvatarComponent.vue";
import { useGameStore } from "@/stores/game";

defineExpose({ open });
const emit = defineEmits<{
  next: [],
}>();

const dialog = useTemplateRef('dialog');
function open() {
  dialog.value?.showModal();
}
function close() {
  dialog.value?.close();
}

const profileStore = useProfileStore();
const profiles: Ref<Array<Profile>> = ref([]);

const gameStore = useGameStore();

watch(gameStore.currentPlayers, loadProfiles);

async function loadProfiles() {
  console.log("loadingprifiles");
  profiles.value.length = 0;
  for (const id of gameStore.currentPlayers) {
    profiles.value.push(await profileStore.getProfile(id));
  }
}

const selected: Ref<number> = ref(-1);
const canStart = computed(() => selected.value > -1);

function next() {
  close();
  gameStore.addPoint(selected.value);
  emit('next');
}

</script>

<template>
  <dialog ref="dialog">
    <article>
      <header>
        <p><strong>Wer hat richtig geraten?</strong></p>
        <button aria-label="Close" rel="prev" @click="close"></button>
      </header>
      <fieldset>
        <div class="content">
          <div v-for="profile in profiles" :key="profile.id">
            <label>
              <input type="radio" name="profile" :value="profile.id" v-model="selected">
              <AvatarComponent :profile="profile"></AvatarComponent>
            </label>
          </div>
        </div>
      </fieldset>
      <button :disabled="!canStart" @click="next">Auswählen</button>
    </article>
  </dialog>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
