<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useUserStore } from "../store/UserStore";
import { useTweets } from "../componsable/useTweets";
import { ITweet } from "../interfaces/ITweet";
import PageLayout from "../components/layout/PageLayout.vue";
import TweetList from "../components/tweets/TweetList.vue";

const store = useUserStore();
const { getTweets } = useTweets();

const tweets = ref<Array<ITweet>>([]);
const loadingTweets = ref<boolean>(true);

const loadFeed = async () => {
  loadingTweets.value = true;

  const tweetData = await getTweets();

  if (tweetData) {
    tweets.value = tweetData;
    loadingTweets.value = false;
  }
};

watchEffect(async () => {
  if (store?.user) await loadFeed();
});
</script>

<template>
  <PageLayout :show-header="true" :title="'Feed'">
    <div>New tweet</div>
    <TweetList :loading-tweets="loadingTweets" :tweets="tweets" />
  </PageLayout>
</template>

<style scoped></style>
