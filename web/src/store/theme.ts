import { defineStore } from "pinia";
import { useColorMode } from "@vueuse/core";
export const THEME_STORAGE_KEY = "anya-theme";

export type ThemeMode = "dark" | "light";

export const useThemeStore = defineStore("theme", {
  state: () => {
    const mode = useColorMode({
      selector: "body",
      attribute: "arco-theme",
      storage: localStorage,
      storageKey: THEME_STORAGE_KEY,
    });

    return { mode };
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
