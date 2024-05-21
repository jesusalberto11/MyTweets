<script setup lang="ts">
defineProps<{ icon: string }>();
</script>

<template>
  <svg width="16" height="16" class="SVG-ICON" viewBox="0 0 16 16">
    <path :d="icon"></path>
  </svg>
</template>

<style scoped></style>
