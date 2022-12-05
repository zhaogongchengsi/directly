import { defineStore } from "pinia";
import { useColorMode, useStorageAsync } from "@vueuse/core";

export const THEME_STORAGE_KEY = "anya-theme";
export const SIDER_STORAGE_SETTING_KEY = "anya-sider-setting";

export type ThemeMode = "dark" | "light";

export const useThemeStore = defineStore("theme", {
  state: () => {
    const mode = useColorMode({
      selector: "body",
      attribute: "arco-theme",
      storage: localStorage,
      storageKey: THEME_STORAGE_KEY,
    });

    const siderSetting = useStorageAsync(SIDER_STORAGE_SETTING_KEY, {
      width: 220,
      collapsed: false,
    });

    return { mode, siderSetting };
  },

  actions: {
    setMode(value?: ThemeMode) {
      if (value && typeof value === "string") {
        this.mode = value;
        return;
      }
      if (this.mode === "dark") {
        this.mode = "light";
      } else if (this.mode === "light") {
        this.mode = "dark";
      }
    },
  },

  getters: {
    themeMode: (state): ThemeMode => {
      return state.mode as ThemeMode;
    },
  },
});
