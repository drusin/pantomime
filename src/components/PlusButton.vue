<script setup lang="ts">
defineProps(['clickAction']);
</script>

<template>
<button class="small-element" :onclick="clickAction"><img src="/plus.svg" alt="Plus" /></button>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
