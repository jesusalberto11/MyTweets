<script setup lang="ts">
defineProps<{ showHeader?: boolean; title?: string }>();
</script>

<template>
  <div class="page-layout-container">
    <div
      class="page-header w-full flex align-start justify-start"
      v-if="showHeader"
    >
      {{ title }}
    </div>
    <div
      class="page-items h-full w-full"
      :style="!showHeader && 'margin-top: 10px'"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-layout-container {
  height: 100%;
  width: 100%;
  max-width: 75ch;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  border-right: 2px solid #efefef;
}

.page-header {
  font-weight: bold;
  font-size: 26px;

  padding: 10px;
  padding-bottom: 10px;

  border-bottom: 5px solid #efefef;
}

.page-items {
  padding: 0px 10px;

  overflow-y: auto;
}

@media screen and (max-width: 768px) {
  .page-layout-container {
    width: 100%;

    align-items: flex-start;

    padding: 10px 10px;
  }
}
</style>
