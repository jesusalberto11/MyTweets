<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  icon: { type: String, required: true, default: "No Icon" },
  title: { type: String, required: true, default: "Rounded button" },
  disabledCondition: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <button
    class="rounded-button flex centered"
    :title="title"
    aria-label="rounded Button"
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
.rounded-button {
  cursor: pointer;

  height: 40px;
  width: 40px;
  min-width: 40px;

  background-color: #fff;

  border: 2px solid #4361ee;

  border-radius: 50%;

  transition: all 0.3s;
}

.rounded-button:hover:not(:disabled) {
  filter: drop-shadow(0 0 8px #8b91ff);
}

.rounded-button:disabled {
  cursor: not-allowed;

  border: 2px solid red;
}

.rounded-button:disabled svg {
  fill: red;
}

svg {
  fill: #4361ee;
}
</style>
