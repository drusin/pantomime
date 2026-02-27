<script setup lang="ts">

import { useProfileStore } from "@/stores/profiles.ts";
import { ref, type Ref, useTemplateRef } from "vue";
import type { Profile } from "@/types.ts";
import AvatarComponent from "@/components/AvatarComponent.vue";
import PlusButton from "@/components/PlusButton.vue";
import NewProfile from "@/components/NewProfile.vue";

const profileStore = useProfileStore();
const profiles: Ref<Array<Profile>> = ref([]);

async function loadProfiles() {
  profiles.value = await profileStore.getAllProfiles();
}

loadProfiles();
const newProfile = useTemplateRef('new-profile');

</script>

<template>
  <dialog ref="dialog" open>
    <article>
      <header>
        Wer spielt mit?
        <PlusButton :clickAction="newProfile?.openDialog"></PlusButton>
      </header>
      <fieldset>
        <div class="content">
          <div v-for="profile in profiles" :key="profile.id">
            <label>
              <input type="checkbox" name="profile">
              <AvatarComponent :profile="profile"></AvatarComponent>
            </label>
          </div>
        </div>
      </fieldset>
    </article>
  </dialog>
  <NewProfile ref="new-profile" @profileCreated="loadProfiles"></NewProfile>
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
