<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "../../store/UserStore";
import UserCircle from "../User/UserCircle.vue";

const store = useUserStore();
</script>

<template>
  <div class="w-full header-container">
    <div
      class="w-full header-items flex align-center justify-between max-width"
    >
      <h3>MyTodo</h3>
      <nav class="flex centered" style="gap: 20px">
        <template v-if="store.isLoggedIn">
          <RouterLink to="/feed">Feed</RouterLink>
          <RouterLink to="/profile">Profile</RouterLink>
          <UserCircle />
        </template>
        <template v-else>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </template>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  background-color: #fff;

  height: 57px;
  width: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  border-bottom: 1px solid #efefef;
}

.header-items {
  height: 100%;

  padding: 10px;
}

nav a {
  color: black;
  text-decoration: none;

  border-radius: 5px;

  padding: 5px;

  transition: all 0.2s;
}

nav a:hover {
  background-color: #6c63ff;
  color: #ffffff;
}
</style>
