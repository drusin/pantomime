<script setup lang="ts">
import PlusButton from "@/components/PlusButton.vue";
import NewProfile from "@/components/NewProfile.vue";
import { ref, useTemplateRef, type Ref } from "vue";
import { useProfileStore } from "@/stores/profiles";
import type { Profile } from "@/types";
import { l } from "vue-router/dist/index-DJQJwTR2.js";
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
  <h1>Spieler</h1>
  <div class="container">
    <PlusButton :clickAction="openProfilePopup"></PlusButton>
    <AvatarComponent v-for="profile in profiles" v-bind:key="profile.id" :profile="profile"></AvatarComponent>
    <NewProfile ref="new-profile" @profileCreated="loadProfiles"></NewProfile>
  </div>
</template>
