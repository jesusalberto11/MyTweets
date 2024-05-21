<script setup lang="ts">
defineProps<{ title?: string; icon: string }>();
</script>

<template>
  <div class="floating-action-button-container">
    <button
      class="floating-button flex centered"
      :title="title ? title : 'Floating action button'"
      type="button"
      role="button"
      aria-label="Floating Action Button"
      @click="$emit('on-click')"
    >
      <svg width="22" height="22" viewBox="0 0 16 16">
        <path :d="icon"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.floating-action-button-container {
  position: fixed;

  width: 100px;
  height: 100px;

  bottom: 0;
  right: 0;

  margin: 35px 10px;
}

.floating-button {
  cursor: pointer;

  position: absolute;

  bottom: 0;
  left: 0;
  right: 0;

  width: 50px;
  height: 50px;

  background-color: #3a0ca3;
  color: #fff;

  border-radius: 50%;
  border: none;
  margin: auto;

  transition: all 0.2s;

  z-index: 100;
}

.floating-button:hover {
  filter: drop-shadow(0 0 8px #6c63ff);
}

.floating-button:active {
  transform: scale(0.9);
}

svg {
  fill: #fff;
}
</style>
