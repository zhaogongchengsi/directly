import { Login } from "@/api/user";
import { TOKEN_KEY } from "@/utils/http";
import { LoginInfo, UserInfo } from "@/types/user";
import { defineStore } from "pinia";
import { reactive } from "vue";
export const USER_INFO_KEY = "anya-userInfo";

export const useUserStore = defineStore("user", {
  state: () => {
    const userInfo = window.localStorage.getItem(USER_INFO_KEY);
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (userInfo && token && token != "") {
      const user = reactive<UserInfo>(JSON.parse(userInfo));
      return { user, logined: true, token };
    }

    return { user: {}, token: "" };
  },

  actions: {
    async login(userinfo: LoginInfo) {
      try {
        const { user, token } = await Login(userinfo);
        window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
        window.localStorage.setItem(TOKEN_KEY, token);
        this.token = token;
        this.user = user;
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
});
