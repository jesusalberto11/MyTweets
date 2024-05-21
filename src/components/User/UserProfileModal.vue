<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { useUserStore } from "../../store/UserStore";
import { SVG_ICONS } from "../../helpers/svgIcons.ts";
import ActionButton from "../UI/ActionButton.vue";
import SimpleButton from "../shared/SimpleButton.vue";
import UserImage from "./UserImage.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";

const store = useUserStore();
const router = useRouter();

const fakeLoading = ref(false);

const dialogRef = ref<InstanceType<typeof HTMLDialogElement>>();
const open = () => dialogRef?.value?.showModal();
const close = () => dialogRef?.value?.close();

const handleSignOut = () => {
  fakeLoading.value = true;

  setTimeout(() => {
    signOut(getAuth()).then(() => {
      fakeLoading.value = false;
      router.push("/login");
    });
  }, 1000);
};

defineExpose({
  open,
});
</script>

<template>
  <dialog ref="dialogRef" class="simple-dialog">
    <div class="user-dialog-items flex column align-center justify-center">
      <div class="w-full flex align-center justify-between">
        <h3>My profile</h3>
        <SimpleButton
          :title="'Close user profile'"
          :icon="SVG_ICONS.CLOSE"
          @on-click="close"
        />
      </div>
      <UserImage
        :url="store?.user?.photo ? store?.user?.photo : null"
        :email="store?.user?.name ? store?.user?.name : null"
        :clickeable="false"
        :customHeight="'100px'"
        :customWidth="'100px'"
        :customBgColor="store?.user?.avatarBgColor"
      />
      <h3>{{ store?.user?.name }}</h3>
      <h4>{{ store?.user?.email }}</h4>
      <template v-if="fakeLoading">
        <LoadingIndicator />
      </template>
      <template v-else>
        <ActionButton
          title="Sign out"
          type="button"
          custom-width="100%"
          @on-click="handleSignOut"
        />
      </template>
    </div>
  </dialog>
</template>

<style scoped>
.user-dialog-items {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  height: auto;
  width: 250px;

  gap: 20px;

  text-align: center;

  padding: 15px 15px;
}
</style>
