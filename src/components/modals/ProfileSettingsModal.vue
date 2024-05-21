<script setup lang="ts">
import { ref } from "vue";
import { SVG_ICONS } from "../../helpers/svgIcons";
import { useUserStore } from "../../store/UserStore";
import { useTweets } from "../../componsable/useTweets";
import { useFirebase } from "../../componsable/useFirebase";
import SimpleButton from "../shared/SimpleButton.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";
import RoundedButton from "../shared/Buttons/RoundedButton.vue";

const store = useUserStore();
const { updateUser } = useFirebase();
const { updateUserTweets } = useTweets();

const dialogRef = ref<InstanceType<typeof HTMLDialogElement>>();
const open = () => dialogRef?.value?.showModal();
const close = () => dialogRef?.value?.close();

const newNameInput = ref<string>("");
// const newPhotoInput = ref<string>("");
const isUpdatingProfile = ref<boolean>(false);

const handleUpdateProfile = async () => {
  if (newNameInput.value === "") {
    console.log("NO");

    return;
  }

  isUpdatingProfile.value = true;

  updateUser(store.user?.uid, {
    name: newNameInput.value,
  }).then(() => {
    store.updateUserData({ name: newNameInput.value });
    updateUserTweets(store.user?.uid, store?.user);

    isUpdatingProfile.value = false;
  });
};

// const updateUserPhoto = () => {
//   isUpdatingProfile.value = true;

//   updateUser(store.user?.uid, {
//     photo: null,
//   }).then(() => {
//     store.updateUserData({ photo: null });
//     updateUserTweets(store.user?.uid, store?.user);

//     isUpdatingProfile.value = false;
//   });
// };

defineExpose({
  open,
});
</script>

<template>
  <dialog ref="dialogRef" class="simple-dialog">
    <div
      class="h-full profile-settings-modal-container flex column align-start justify-start"
    >
      <template v-if="isUpdatingProfile">
        <div
          class="loading-indicator h-full w-full flex column centered"
          style="gap: 15px"
        >
          <LoadingIndicator />
          <p>Updating profile...</p>
        </div>
      </template>
      <template v-else>
        <div class="w-full flex align-center justify-between">
          <h3>Profile settings</h3>
          <SimpleButton
            :title="'Close profile settings'"
            :icon="SVG_ICONS.CLOSE"
            @on-click="close"
          />
        </div>
        <div class="w-full h-full flex column align-start" style="gap: 10px">
          <label for="newName">User name</label>
          <div
            class="w-full h-full flex centered row column align-start"
            style="gap: 10px"
          >
            <input
              id="newName"
              class="w-full"
              v-model="newNameInput"
              placeholder="Write your new name"
            />
            <RoundedButton
              :icon="SVG_ICONS.CHECK"
              :title="'Save changes'"
              @click="handleUpdateProfile"
              :disabled-condition="
                newNameInput === '' ||
                newNameInput === null ||
                newNameInput === undefined
              "
            />
          </div>
        </div>

        <label for="newProfilePic">Profile picture</label>
        <div
          class="w-full h-full flex centered row column align-start"
          style="gap: 10px"
        >
          <input
            id="newProfilePic"
            class="w-full"
            placeholder="Put your image URL link"
            disabled
          />
          <RoundedButton
            :icon="SVG_ICONS.CHECK"
            :title="'Save changes'"
            @click=""
            :disabled-condition="true"
          />
        </div>
        <p class="class-tweet-update-info w-full flex centered">
          Tweet data will be updated when the page is reloaded.
        </p>
      </template>
    </div>
  </dialog>
</template>

<style scoped>
.profile-settings-modal-container {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  width: 400px;

  gap: 10px;

  text-align: center;

  padding: 15px 15px;
}

.class-tweet-update-info {
  color: #616161;
  font-size: 13px;
}
</style>
