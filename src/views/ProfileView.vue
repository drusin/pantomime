<script setup lang="ts">
import PlusButton from "@/components/PlusButton.vue";
import NewProfile from "@/components/NewProfile.vue";
import { ref, useTemplateRef, type Ref } from "vue";
import { useProfileStore } from "@/stores/profiles";
import type { Profile } from "@/types";
import AvatarComponent from "@/components/AvatarComponent.vue";

const newProfile = useTemplateRef('new-profile');
const openProfilePopup = () => newProfile.value?.openDialog();
const profileStore = useProfileStore();

const profiles: Ref<Array<Profile>> = ref([]);
loadProfiles();

async function loadProfiles() {
  profiles.value = await profileStore.getAllProfiles();
}

</script>
<template>
  <div class="container">
    <header>
      <h1>Spieler</h1>
      <PlusButton :clickAction="openProfilePopup"></PlusButton>
    </header>
    <main class="container">
      <AvatarComponent v-for="profile in profiles" v-bind:key="profile.id"
                       :profile="profile"></AvatarComponent>
    </main>
    <NewProfile ref="new-profile" @profileCreated="loadProfiles"></NewProfile>
  </div>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
}

main {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
