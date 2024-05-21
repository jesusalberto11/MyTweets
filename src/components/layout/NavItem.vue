<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{ to: string; icon: string; title: string }>();

const route = useRoute();
const currentRoute = ref<string>("");

const checkActiveRoute = computed(() => {
  return currentRoute.value === props.to.slice(1) ? "active" : "";
});

watchEffect(() => {
  currentRoute.value = route.fullPath.slice(1);
});
</script>

<template>
  <RouterLink
    :to="to"
    class="w-full flex row align-center justify-start"
    :class="checkActiveRoute"
    replace
  >
    <svg width="22" height="22" viewBox="0 0 16 16">
      <path :d="icon"></path>
    </svg>
    <h3>{{ title }}</h3>
  </RouterLink>
</template>

<style scoped>
a {
  width: 100%;

  color: black;
  text-decoration: none;

  gap: 10px;

  border-radius: 5px;

  padding: 5px;

  transition: all 0.2s;
}

.active {
  color: #6c63ff;
  font-weight: bold;
}

.active svg {
  fill: #6c63ff;
}

a:hover:not(.active) {
  background-color: #6c63ff;
  color: #ffffff;

  padding-left: 15px;
}

a:hover:not(.active) svg {
  fill: #ffffff;
}
</style>
