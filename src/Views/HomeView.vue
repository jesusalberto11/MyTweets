<script setup lang="ts">
import { watchEffect } from "vue";
import { useUserStore } from "../store/UserStore";
import PageLayout from "../components/layout/PageLayout.vue";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

watchEffect(async () => {
  if (store?.user) router.push("/feed");
});
</script>

<template>
  <PageLayout>
    <div class="not-logged-in-container h-full flex centered">
      <div
        class="flex centered"
        style="flex-direction: column; align-items: flex-start; gap: 15px"
      >
        <h1>You're not logged In!</h1>
        <h2>Register to save your Todo's!</h2>
      </div>
      <img
        class="not-logged-in-img h-full"
        src="/register_login.svg"
        alt="Save your Todo's"
        loading="lazy"
      />
    </div>
  </PageLayout>
</template>

<style scoped>
.not-logged-in-img {
  width: 400px;
}

@media screen and (max-width: 768px) {
  .not-logged-in-container {
    flex-direction: column-reverse;
    gap: 30px;
  }

  .not-logged-in-img {
    height: 150px;
    width: 100%;
  }
}
</style>
