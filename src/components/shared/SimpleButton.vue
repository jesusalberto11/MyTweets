<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  icon: { type: String, required: true, defaul: "No Icon" },
  title: { type: String, required: true, defaul: "Simple button" },
  disabledCondition: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <button
    class="simple-button flex centered"
    :title="title"
    aria-label="Simple Button"
    type="button"
    autofocus
    :disabled="props.disabledCondition"
    @click="$emit('on-click')"
  >
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path :d="props.icon"></path>
    </svg>
  </button>
</template>

<style scoped>
.simple-button {
  cursor: pointer;

  height: 30px;
  width: 30px;
  min-width: 30px;

  background-color: #fff;

  border: 1px solid #4361ee;
  border-radius: 5px;

  transition: all 0.3s;
}

.simple-button:hover {
  filter: drop-shadow(0 0 8px #8b91ff);
}

.simple-button:disabled {
  cursor: not-allowed;
}
</style>
