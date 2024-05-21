<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../store/UserStore";
import UserImage from "./UserImage.vue";
import UserProfileModal from "./UserProfileModal.vue";

const store = useUserStore();

const dialogRef = ref<InstanceType<typeof UserProfileModal>>();
const openDialog = () => dialogRef?.value?.open();
</script>

<template>
  <div
    class="user-circle w-full flex align-center justify-start"
    style="gap: 10px"
    @click="openDialog"
  >
    <UserImage
      :url="store?.user?.photo ? store?.user?.photo : null"
      :email="store?.user?.name ? store?.user?.name : null"
      :title="'Open your profile'"
      :clickeable="false"
      :customHeight="'40px'"
      :customWidth="'40px'"
      :customBgColor="store?.user?.avatarBgColor"
      :customFontSize="'20px'"
    />
    <h3>
      {{ store?.user?.name }}
    </h3>
  </div>
  <UserProfileModal ref="dialogRef" />
</template>

<style scoped>
.user-circle {
  cursor: pointer;

  border-radius: 5px;

  padding: 5px 0px;

  transition: all 0.2s;
}

.user-circle:hover {
  background-color: #6c63ff;
  color: #fff;

  padding-left: 15px;
}
</style>
