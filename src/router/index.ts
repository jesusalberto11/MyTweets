import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import HomeView from "../Views/HomeView.vue";
import FeedView from "../Views/FeedView.vue";
import LoginView from "../Views/LoginView.vue";
import RegisterView from "../Views/RegisterView.vue";
import ProfileView from "../Views/ProfileView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    meta: {
      title: "Home | MyTweets",
    },
  },
  {
    path: "/login",
    component: LoginView,
    meta: {
      title: "Login | MyTweets",
    },
  },
  {
    path: "/feed",
    component: FeedView,
    meta: {
      title: "Feed | MyTweets",
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    component: ProfileView,
    meta: {
      title: "Profile | MyTweets",
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    component: RegisterView,
    meta: {
      title: "Sign up | MyTweets",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user: any) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  window.document.title =
    to.meta && to.meta.title ? to.meta.title.toString() : "MyTweets";

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You don't have access");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
