<script setup lang="ts">
import { ref } from "vue";
import Tweet from "./Tweet.vue";
import FAB from "../shared/Buttons/FAB.vue";
import { ITweet } from "../../interfaces/ITweet";
import { SVG_ICONS } from "../../helpers/svgIcons";
import AddNewTweetModal from "../modals/AddNewTweetModal.vue";
import LoadingIndicator from "../shared/LoadingIndicator.vue";

defineProps<{ loadingTweets: boolean; tweets: Array<ITweet> }>();

const newTweetModalRef = ref<InstanceType<typeof AddNewTweetModal>>();
const openNewTweetModal = () => newTweetModalRef?.value?.open();
</script>

<template>
  <template v-if="loadingTweets">
    <div class="loading-indicator w-full">
      <LoadingIndicator />
    </div>
  </template>
  <template v-else>
    <div class="tweets-container w-full flex column">
      <template v-for="tweet in tweets" :key="tweet.id">
        <Tweet :tweet="tweet" />
      </template>
      <div class="fake-tweet"></div>
      <FAB
        :title="'Add new Tweet'"
        :icon="SVG_ICONS.ADD"
        @on-click="openNewTweetModal"
      />
      <AddNewTweetModal ref="newTweetModalRef" />
    </div>
  </template>
</template>

<style scoped>
.tweets-container {
  padding-bottom: 10px;
}

.fake-tweet {
  height: 100px;
}

.loading-indicator {
  place-self: center;

  padding: 50px;
}
</style>
