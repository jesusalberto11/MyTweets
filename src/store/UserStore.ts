import { defineStore } from "pinia";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";

interface State {
  user: IDatabaseUser | null;
  isLoggedIn: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return { user: null, isLoggedIn: false };
  },
  getters: {},
  actions: {
    setUser(user: IDatabaseUser | null, logged: boolean) {
      this.user = user;
      this.isLoggedIn = logged;
    },
    setUserData(user: IDatabaseUser | null) {
      console.log("user:", user);
      this.user = user;
    },
    updateUserData(newData: Partial<IDatabaseUser>) {
      if (this.user) {
        Object.assign(this.user, newData);
      }
    },
  },
});
