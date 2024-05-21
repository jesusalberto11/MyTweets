<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./store/UserStore";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { useFirebase } from "./componsable/useFirebase";
import LoadingIndicator from "./components/shared/LoadingIndicator.vue";
import AppSidebar from "./components/layout/AppSidebar.vue";

const store = useUserStore();
const { registerUser } = useFirebase();

const isLoading = ref(true);
let auth: Auth;

onMounted(async () => {
  isLoading.value = true;
  auth = getAuth();

  onAuthStateChanged(auth, (userData) => {
    if (userData) {
      registerUser(
        userData.uid,
        userData.photoURL,
        userData.displayName,
        userData.email!
      ).then((user) => {
        if (user) {
          store.setUser(user, true);
          isLoading.value = false;
        }
      });
    } else {
      store.setUser(null, false);
      isLoading.value = false;
    }
  });
});
</script>

<template>
  <template v-if="store.isLoggedIn">
    <template v-if="isLoading">
      <div class="loading-wheel flex column centered" style="gap: 20px">
        <LoadingIndicator />
        <h3>Loading feed...</h3>
      </div>
    </template>
    <template v-else>
      <div class="app">
        <main class="main-content flex centered">
          <AppSidebar />
          <RouterView />
        </main>
      </div>
    </template>
  </template>
  <template v-else>
    <div class="not-logged-container flex centered">
      <RouterView />
    </div>
  </template>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto minmax(1fr, 1fr);
}

.main-content {
  height: 100%;
  width: 100%;

  overflow-y: auto;
}

.not-logged-container {
  height: 100vh;
  width: 100vw;
}

.loading-wheel {
  background-color: #fff;

  height: 100vh;
  width: 100vw;

  z-index: 99999;
}
</style>
