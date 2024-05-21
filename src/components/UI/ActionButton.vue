<script setup lang="ts">
const props = defineProps<{
  title: string;
  type?: string;
  customWidth?: string;
  disabledCondition?: boolean;
}>();
</script>

<template>
  <button
    :class="`action-button flex centered ${type}`"
    :style="{
      width: props.customWidth ? props.customWidth : '340px',
    }"
    :title="title"
    type="submit"
    role="button"
    :disabled="disabledCondition"
    @click="$emit('on-click')"
  >
    <slot />
    {{ title }}
  </button>
</template>

<style scoped>
.action-button {
  cursor: pointer;

  background-color: #f8f9fa;
  color: #000;

  height: 48px;

  padding: 0px 10px;

  border: 1px solid #4361ee;
  border-radius: 5px;

  gap: 10px;

  text-align: center;
  font-weight: bold;
  font-size: 16px;

  transition: all 0.2s;
}

.action-button:hover:not(:disabled) {
  background-color: #c6d0ff;
}

.action-button:active:not(:disabled) {
  transform: scale(0.95);
}

.login {
  background-color: #2ec4b6;
  border: 1px solid #006d77;
}

.login:hover:not(:disabled) {
  background-color: #006d77;
  color: #fff;
}

.login:active:not(:disabled) {
  background-color: #2ec4b6;
}

.action-button:disabled {
  cursor: not-allowed;

  background-color: #d90429;
  color: #fff;

  border: 1px solid #ef233c;
}
</style>
