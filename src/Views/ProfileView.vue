<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "../store/UserStore";
import { useTweets } from "../componsable/useTweets";
import { ITweet } from "../interfaces/ITweet";
import { SVG_ICONS } from "../helpers/svgIcons";
import PageLayout from "../components/layout/PageLayout.vue";
import TweetList from "../components/tweets/TweetList.vue";
import UserImage from "../components/User/UserImage.vue";
import RoundedButton from "../components/shared/Buttons/RoundedButton.vue";
import ProfileSettingsModal from "../components/modals/ProfileSettingsModal.vue";
import ProfileTabs from "../components/Views/ProfileView/ProfileTabs.vue";

const store = useUserStore();
const { getUserTweets } = useTweets();

const profileSettingsModalRef =
  ref<InstanceType<typeof ProfileSettingsModal>>();
const openSettingsModal = () => profileSettingsModalRef?.value?.open();

const tweets = ref<Array<ITweet>>([]);
const loadingTweets = ref<boolean>(true);

onMounted(() => {
  loadFeed();
});

const loadFeed = async () => {
  loadingTweets.value = true;

  const tweetData = await getUserTweets(store.user?.uid);

  if (tweetData) {
    tweets.value = tweetData;
    loadingTweets.value = false;
  }
};
</script>

<template>
  <PageLayout>
    <div class="profile-header w-full">
      <div class="user-bg-img w-full"></div>
      <div class="banner w-full flex align-center justify-between">
        <div class="user-img flex centered">
          <UserImage
            :url="store?.user?.photo ? store?.user?.photo : null"
            :email="store?.user?.name ? store?.user?.name : null"
            :clickeable="false"
            :customHeight="'90px'"
            :customWidth="'90px'"
            :customBgColor="store?.user?.avatarBgColor"
          />
        </div>
        <div class="flex">
          <RoundedButton
            :icon="SVG_ICONS.SETTINGS"
            :title="'Open profile settings'"
            @on-click="openSettingsModal"
          />
        </div>
      </div>
      <div
        class="user-info flex column align-start justify-start"
        style="gap: 10px"
      >
        <div class="w-full flex align-center justify-start" style="gap: 5px">
          <h3 class="user-name">{{ store?.user?.name }}</h3>
          <!-- <div class="verified-avatar-icon">✓</div> -->
        </div>
        <div class="w-full flex align-start justify-start" style="gap: 10px">
          <p style="font-size: 16px">
            0 <span style="color: #616161">Following</span>
          </p>
          <p style="font-size: 16px">
            0 <span style="color: #616161">Followers</span>
          </p>
        </div>
      </div>
    </div>
    <ProfileTabs />
    <ProfileSettingsModal ref="profileSettingsModalRef" />

    <TweetList :loading-tweets="loadingTweets" :tweets="tweets" />
  </PageLayout>
</template>

<style scoped>
.profile-header {
  max-width: 75ch;

  border: 1px solid #7289f3;

  border-radius: 5px;
}

.user-bg-img {
  height: 200px;

  background-color: #a1b0f7;
}

.banner {
  height: 50px;

  background-color: #fff;

  padding: 0px 20px;
}

.user-img {
  height: 100px;
  width: 100px;

  background-color: #a9def9;
  border: 5px solid #fff;

  border-radius: 50%;

  margin-bottom: 50px;

  place-self: center;
}

.user-info {
  padding: 10px 20px;
  padding-bottom: 20px;
}

.verified-avatar-icon {
  width: 25px;
  height: 25px;

  background: #fca311;
  color: black;

  border-radius: 50%;

  display: grid;

  font-size: 16px;
  font-weight: bolder;
  text-align: center;
  line-height: 25px;
}
</style>
