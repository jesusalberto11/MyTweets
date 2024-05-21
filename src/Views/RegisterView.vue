<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import PageLayout from "../components/layout/PageLayout.vue";
import PasswordHit from "../components/Views/SignUpView/PasswordHit.vue";
import ActionButton from "../components/UI/ActionButton.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const passwordStrength = ref(0);

const isPasswordLengthMoreThanSix = ref(false);
const isPasswordLengthMoreThanTen = ref(false);
const hasPasswordOneUppercase = ref(false);
const hasPasswordOneNumber = ref(false);

const onSubmitForm = () => {
  console.log(email.value, password.value);

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((_data) => {
      router.push("/feed");
    })
    .catch((error) => {
      console.error("Error at register:", error);
    });
};

const checkPasswordStrength = (p: string) => {
  let strongness = 0;

  const isLengthMoreThanSix = p.length > 6;
  const isLengthMoreThanTen = p.length >= 10;
  const isLengthMoreThanFifteen = p.length > 15;

  const hasOneUppercase = /[A-Z]/.test(p);
  const hasOneNumber = /[0-9]/.test(p);
  const hasAlphanumeric = /[A-Za-z0-9]/.test(p);

  isPasswordLengthMoreThanSix.value = isLengthMoreThanSix;
  isPasswordLengthMoreThanTen.value = isLengthMoreThanTen;
  hasPasswordOneUppercase.value = hasOneUppercase;
  hasPasswordOneNumber.value = hasOneNumber;

  if (isLengthMoreThanSix) strongness++;
  if (isLengthMoreThanTen) strongness++;
  if (hasOneUppercase && isLengthMoreThanSix) strongness++;
  if (hasOneNumber && isLengthMoreThanSix) strongness++;
  if (hasAlphanumeric && isLengthMoreThanFifteen && hasOneUppercase)
    strongness++;

  return strongness * 20;
};

watchEffect(() => {
  passwordStrength.value = checkPasswordStrength(password.value);
});
</script>

<template>
  <PageLayout>
    <br />
    <h1>Sign up</h1>
    <hr />

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
      <input
        class="form-input"
        type="password"
        placeholder="Repeat password"
        autocomplete="password"
        v-model="repeatPassword"
        required
      />
      <div class="password-strength-container">
        {{ passwordStrength }}
        <div class="password-strength-bar-container">
          <div
            class="password-strength-fill"
            :style="{ width: `${passwordStrength}%` }"
          ></div>
        </div>
      </div>
      <div class="password-hits flex column align-start justify-center">
        <PasswordHit
          :condition="isPasswordLengthMoreThanSix"
          :msg="'Password length its at least 6'"
        />
        <PasswordHit
          :condition="hasPasswordOneUppercase"
          :msg="'Has at least one uppercase'"
        />
        <PasswordHit
          :condition="hasPasswordOneNumber"
          :msg="'Has at least one number'"
        />
        <PasswordHit
          :condition="isPasswordLengthMoreThanTen"
          :msg="'Password length its at least 10 or more'"
        />
      </div>
      <ActionButton
        title="Create user"
        type="button"
        :disabled-condition="
          passwordStrength < 80 ||
          password !== repeatPassword ||
          email === '' ||
          email === null ||
          email === undefined
        "
      />
    </form>

    <div class="flex centered" style="gap: 5px">
      <p>Already have an account?</p>
      <RouterLink to="/login">Login now</RouterLink>
    </div>
  </PageLayout>
</template>

<style scoped>
.password-strength-container {
  height: 10px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.password-strength-bar-container {
  height: 10px;
  width: 100%;

  background-color: #c5c5c5;

  border-radius: 50px;

  transition: all 0.2s;
}

.password-strength-fill {
  height: 100%;

  background-color: blueviolet;

  border-radius: 50px;

  transition: all 0.2s;
}

.password-hits {
  width: 100%;
  max-width: 340px;
}
</style>
