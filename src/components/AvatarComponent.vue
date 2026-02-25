<script setup lang="ts">
import type { Profile } from '@/types';

defineProps<{
  profile: Profile
}>();
</script>
<template>
  <div class="medium-element">
    <img :src="profile.image" />
  </div>
</template>
<style scoped>
img {
  object-fit: contain;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
</style>
