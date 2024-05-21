<script setup lang="ts">
import UserImage from "../User/UserImage.vue";
import { ITweet } from "../../interfaces/ITweet";
import { formatDate } from "../../helpers/dateParser";

defineProps<{ tweet: ITweet }>();
</script>

<template>
  <div
    class="tweet-container w-full flex column align-start justify-start"
    style="gap: 10px"
  >
    <div class="tweet-header flex align-center justify-start" style="gap: 10px">
      <UserImage
        :url="tweet.userPhoto ? tweet.userPhoto : null"
        :email="tweet.userName ? tweet.userName : null"
        :title="tweet.userName + ' Picture'"
        :clickeable="false"
        :customHeight="'40px'"
        :customWidth="'40px'"
        :customFontSize="'16px'"
        :customBgColor="tweet.bgColor"
      />
      <p class="tweet-username">{{ tweet.userName }}</p>
    </div>
    <p class="tweet-content">{{ tweet.content }}</p>
    <p class="tweet-date">{{ formatDate(tweet.date) }}</p>
  </div>
</template>

<style scoped>
.tweet-container {
  background-color: #fff;

  height: auto;

  text-align: left;

  border-bottom: 1px solid #efefef;

  padding: 10px;
}

.tweet-username {
  font-size: 15px;
  font-weight: bold;
}

.tweet-content {
  font-size: 16px;
}

.tweet-date {
  color: #616161;
  font-size: 13px;
}

@media screen and (max-width: 768px) {
  .tweet-container {
    width: 100%;
  }
}
</style>
