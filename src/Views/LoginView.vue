<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import ActionButton from "../components/UI/ActionButton.vue";
import LoadingIndicator from "../components/shared/LoadingIndicator.vue";
import ErrorMessage from "../components/shared/ErrorMessage.vue";
import GoogleLogo from "../components/shared/GoogleLogo.vue";
import { errorMessages } from "../helpers/errorMessages";

const router = useRouter();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMsg = ref("");

const onSubmitForm = () => {
  isLoading.value = true;
  errorMsg.value = "";

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((_data) => {
      isLoading.value = false;
      email.value = "";
      password.value = "";

      router.push("/feed");
    })
    .catch((error) => {
      isLoading.value = false;
      errorMsg.value = errorMessages[error.code] || errorMessages.default;
    });
};

const handleGoogleSignIn = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(getAuth(), provider)
    .then((_result) => {
      router.push("/feed");
    })
    .catch((error) => {
      console.error(error.code);
    });
};
</script>

<template>
  <div class="login-page-container h-full w-full column flex centered">
    <h1>Sign in to MyTweets</h1>
    <hr />
    <ActionButton
      title="Continue with Google"
      @on-click="handleGoogleSignIn"
      type="button"
    >
      <GoogleLogo />
    </ActionButton>
    <div class="flex centered" style="width: 100%; gap: 10px">
      <hr />
      <p>or</p>
      <hr />
    </div>
    <form @submit.prevent="onSubmitForm">
      <input
        class="form-input"
        type="email"
        placeholder="Email"
        autocomplete="email"
        v-model="email"
        required
      />
      <input
        class="form-input"
        type="password"
        placeholder="Password"
        autocomplete="password"
        v-model="password"
        required
      />
      <ErrorMessage :msg="errorMsg" @click="() => (errorMsg = '')" />
      <template v-if="isLoading">
        <LoadingIndicator />
      </template>
      <template v-else>
        <ActionButton title="Log in" type="login" />
      </template>
    </form>
    <hr />
    <div class="flex centered" style="gap: 5px">
      <p>No account?</p>
      <RouterLink to="/register">Create one</RouterLink>
    </div>
    <RouterLink to="/">Go to home</RouterLink>
  </div>
  <br />
</template>

<style scoped>
.login-page-container {
  height: 100%;
  width: fit-content;
  max-width: 75ch;

  gap: 20px;
}
</style>
