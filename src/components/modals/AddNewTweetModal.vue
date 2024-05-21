<script setup lang="ts">
import { computed, ref } from "vue";
import { useTweets } from "../../componsable/useTweets";
import { SVG_ICONS } from "../../helpers/svgIcons";
import { useUserStore } from "../../store/UserStore";
import SimpleButton from "../shared/SimpleButton.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";

const store = useUserStore();
const { createTweet } = useTweets();

const dialogRef = ref<InstanceType<typeof HTMLDialogElement>>();
const open = () => dialogRef?.value?.showModal();
const close = () => dialogRef?.value?.close();

const newTweetContent = ref<string>("");
const isPostingNewTweet = ref<boolean>(false);

const checkIfTweetItsOverTextLimit = computed(() => {
  if (newTweetContent.value.length >= 300) {
    return "danger";
  } else if (
    newTweetContent.value.length > 150 &&
    newTweetContent.value.length < 300
  ) {
    return "medium";
  } else {
    return "normal";
  }
});

const handleCreateTweet = async () => {
  if (newTweetContent.value.length > 300) return;

  isPostingNewTweet.value = true;

  await createTweet(store.user, newTweetContent.value).then(() => {
    close();

    newTweetContent.value = "";
    isPostingNewTweet.value = false;
  });
};

defineExpose({
  open,
});
</script>

<template>
  <dialog ref="dialogRef" class="simple-dialog">
    <div
      class="add-new-tweet-container flex column align-center justify-center"
    >
      <template v-if="isPostingNewTweet">
        <div
          class="loading-indicator h-full w-full flex column centered"
          style="gap: 15px"
        >
          <LoadingIndicator />
          <p>Posting tweet...</p>
        </div>
      </template>
      <template v-else>
        <div class="w-full flex align-center justify-between">
          <h3>New Tweet</h3>
          <SimpleButton
            :title="'Close new tweet'"
            :icon="SVG_ICONS.CLOSE"
            @on-click="close"
          />
        </div>
        <form
          class="w-full flex column align-start justify-center"
          style="gap: 10px"
          @submit.prevent="handleCreateTweet"
        >
          <label for="new-tweet" hidden>Add a new tweet</label>
          <textarea
            id="new-tweet"
            class="add-tweet-textarea w-full"
            autocorrect="true"
            maxlength="300"
            minlength="1"
            placeholder="What are your thoughts today?"
            title="Write your tweet"
            v-model="newTweetContent"
            required
          ></textarea>
          <div class="w-full flex align-center justify-between">
            <p :class="`max-length-text ${checkIfTweetItsOverTextLimit}`">
              {{ newTweetContent.length }}/300
            </p>
            <button
              class="round-btn flex centered"
              type="submit"
              role="button"
              title="'Post new Tweet'"
            >
              Tweet
            </button>
          </div>
        </form>
      </template>
    </div>
  </dialog>
</template>

<style scoped>
.add-new-tweet-container {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  height: 230px;
  width: 400px;

  gap: 10px;

  text-align: center;

  padding: 15px 15px;
}

.add-tweet-textarea {
  resize: none;

  height: 130px;

  padding: 10px 10px;

  border: 1px solid #4361ee;
  border-radius: 5px;
}

.add-tweet-textarea:focus {
  outline: 1px solid #4361ee;
}

.max-length-text {
  font-size: 16px;
}

.danger {
  color: #fe6d73;
}

.medium {
  color: #ff9f1c;
}

.normal {
  color: #2ec4b6;
}

.loading-indicator {
  background-color: rgb(255, 255, 255, 0.5);

  position: absolute;
}

.round-btn {
  cursor: pointer;

  height: 30px;
  width: auto;

  background-color: #f8f9fa;
  color: #000;

  font-weight: bold;

  border: 1px solid #4361ee;
  border-radius: 50px;

  padding: 10px;

  transition: all 0.2s;
}

.round-btn:hover {
  background-color: #c6d0ff;
}

.round-btn:active {
  transform: scale(0.95);
}

@media screen and (max-width: 768px) {
  .add-new-tweet-container {
    width: 90vw;
  }
}
</style>
