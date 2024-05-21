<script setup lang="ts">
defineProps<{ condition: boolean; msg: string }>();
</script>

<template>
  <p :class="condition ? 'password-hit active' : 'password-hit'">
    {{ msg }}
  </p>
</template>

<style scoped>
.password-hit {
  color: red;
}

.password-hit.active {
  color: #006d77;
}
</style>
