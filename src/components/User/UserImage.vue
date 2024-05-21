<script setup lang="ts">
defineProps<{
  url: string | null;
  email: string | null;
  title?: string | null;
  customHeight: string;
  customWidth: string;
  customFontSize?: string;
  clickeable: boolean;
  customBgColor?: string;
}>();
</script>

<template>
  <template v-if="url">
    <img
      class="user-image"
      :class="{ clickeable: clickeable }"
      :style="{ height: customHeight, width: customWidth }"
      :src="url"
      :title="title ? title : 'Your picture'"
      alt="Your picture"
      loading="lazy"
    />
  </template>
  <template v-else>
    <div
      class="user-image text flex centered"
      :class="{ clickeable: clickeable }"
      :style="{
        height: customHeight,
        width: customWidth,
        fontSize: customFontSize,
        backgroundColor: customBgColor,
      }"
      :title="title ? title : 'Your picture'"
    >
      {{ email?.slice(0, 1).toUpperCase() }}
    </div>
  </template>
</template>

<style scoped>
.user-image {
  user-select: none;

  border-radius: 50%;

  transition: all 0.2s;

  min-width: v-bind(customHeight);

  place-self: center;
  object-fit: cover;
  object-position: 50% 50%;
}

.text {
  background-color: #3a0ca3;
  color: #fff;

  font-size: 36px;
}

.clickeable {
  cursor: pointer;

  font-size: 14px;
}

.clickeable:hover {
  filter: drop-shadow(0 0 8px #6c63ff);
}
</style>
