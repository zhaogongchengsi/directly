import type { App } from "vue";
import { createPinia } from "pinia";

export { useUserStore } from './user'

export function createAppStore (app: App) {
    app.use(createPinia());
    return app
}