import type { App } from "vue";
import { createPinia } from "pinia";

export { useUserStore } from "./user";
export { useThemeStore } from "./theme";
export { useAppStore } from "./app";

export function createAppStore(app: App) {
  app.use(createPinia());
  return app;
}
