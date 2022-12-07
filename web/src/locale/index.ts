import { createI18n } from "vue-i18n";
import cn from "./zh-CN";
import en from "./en-US";
import { App } from "vue";

export const LOCALE_OPTIONS = [
  { label: "中文", value: "zh-CN" },
  { label: "English", value: "en-US" },
];
const defaultLocale = localStorage.getItem("arco-locale") || "zh-CN";

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: "en-US",
  allowComposition: true,
  messages: {
    "en-US": en,
    "zh-CN": cn,
  },
});

export function createAppI18n(app: App) {
  app.use(i18n);
}
