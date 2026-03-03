<script setup lang="ts">
import { RouterView } from 'vue-router'
document.documentElement.setAttribute('data-theme', 'light');
</script>

<template>
  <div class="main">
    <RouterView />
  </div>
</template>
<style scoped>
.main {
  padding: 1em;
}
</style>
