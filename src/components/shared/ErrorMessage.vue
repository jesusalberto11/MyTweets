<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <div class="error-message-box flex centered" v-if="msg">{{ msg }}</div>
</template>

<style scoped>
.error-messgae-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message-box {
  height: 48px;
  width: 340px;

  background-color: #ba181b;

  border: 3px solid #e5383b;
  border-radius: 5px;
}
</style>
