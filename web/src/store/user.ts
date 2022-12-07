import { Login } from "@/api/user";
import { defineStore } from "pinia";
import type { LoginInfo } from "#/user";

export const USER_INFO_KEY = "anya-userInfo";

export const useUserStore = defineStore("user", {
  state: () => {
    return {};
  },

  actions: {
    async login(userinfo: LoginInfo) {
      const user = await Login(userinfo);
      console.log(user);
    },
  },
});
