<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import UserCircle from "../User/UserCircle.vue";
import NavItem from "./NavItem.vue";
import ActionButton from "../UI/ActionButton.vue";
import AddNewTweetModal from "../modals/AddNewTweetModal.vue";
import { useUserStore } from "../../store/UserStore";
import { SVG_ICONS } from "../../helpers/svgIcons";

const store = useUserStore();

const newTweetModalRef = ref<InstanceType<typeof AddNewTweetModal>>();
const openNewTweetModal = () => newTweetModalRef?.value?.open();
</script>

<template>
  <aside
    class="app-sidebar-container h-full flex column align-start justify-start"
    style="gap: 15px"
  >
    <h2>MyTweets</h2>
    <hr />
    <nav class="w-full flex column align-start justify-start" style="gap: 25px">
      <template v-if="store.isLoggedIn">
        <UserCircle />
        <NavItem :to="'/feed'" :icon="SVG_ICONS.HOME" :title="'Feed'" />
        <NavItem
          :to="'/profile'"
          :icon="SVG_ICONS.PROFILE_FILL"
          :title="'Profile'"
        />
        <ActionButton
          :title="'Tweet'"
          :custom-width="'100%'"
          @on-click="openNewTweetModal"
        />
        <AddNewTweetModal ref="newTweetModalRef" />
      </template>
      <template v-else>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar-container {
  width: 300px;

  padding: 10px;

  border-right: 2px solid #efefef;
}
</style>
