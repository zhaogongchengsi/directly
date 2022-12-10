import type { App } from "vue";
import { createPinia } from "pinia";

export { useUserStore } from "./user";
export { useThemeStore } from "./theme";
export { useTabsStore } from "./tabs";
export type { HistoryRecord } from "./tabs";

export function createAppStore(app: App) {
  app.use(createPinia());
  return app;
}
