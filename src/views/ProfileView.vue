<script setup lang="ts">
import PlusButton from "@/components/PlusButton.vue";
import NewProfile from "@/components/NewProfile.vue";
import { useTemplateRef } from "vue";

const newProfile = useTemplateRef('new-profile');
const openProfilePopup = () => newProfile.value?.openDialog();

</script>
<template>
  <h1>Spieler</h1>
  <div class="container">
    <PlusButton :clickAction="openProfilePopup"></PlusButton>
    <NewProfile ref="new-profile"></NewProfile>
  </div>
</template>
