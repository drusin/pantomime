<script setup lang="ts">

import { useProfileStore } from "@/stores/profiles.ts";
import { computed, ref, type Ref, useTemplateRef } from "vue";
import type { Profile } from "@/types.ts";
import AvatarComponent from "@/components/AvatarComponent.vue";
import PlusButton from "@/components/PlusButton.vue";
import NewProfile from "@/components/NewProfile.vue";
import { useGameStore } from "@/stores/game";

defineExpose({ open });
const emit = defineEmits([ 'next' ]);

const dialog = useTemplateRef('dialog');
function open() {
  dialog.value?.showModal();
}
function close() {
  dialog.value?.close();
}

const profileStore = useProfileStore();
const profiles: Ref<Array<Profile>> = ref([]);

async function loadProfiles() {
  profiles.value = await profileStore.getAllProfiles();
}

loadProfiles();
const newProfile = useTemplateRef('new-profile');

const selected = ref([]);
const canStart = computed(() => selected.value.length > 0);

const gameStore = useGameStore();
function next() {
  gameStore.setPlayers(selected.value);
  close();
  emit('next');
}

</script>

<template>
  <dialog ref="dialog">
    <article>
      <header>
        Wer hat richtig geraten?
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
      <button :disabled="!canStart" @click="next">Starten</button>
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
