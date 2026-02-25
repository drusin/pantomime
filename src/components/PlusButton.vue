<script setup lang="ts">
defineProps<{
  clickAction: any
}>();
</script>

<template>
<button :onclick="clickAction"><img src="/plus.svg" alt="Plus" /></button>
</template>

<style scoped>
img {
  width: 64px;
  height: 64px;
}
</style>
