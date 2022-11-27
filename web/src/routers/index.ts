import type { App } from "vue";
import {
  createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/index.vue"), name: "home" },
  { path: "/login", component: () => import("../views/login/login.vue"), name: "login" },
];

export function createAppRouters(app: App) {
  const routerOptions = {
    history: createWebHistory(),
    routes,
  };

  app.use(createRouter(routerOptions));
  return app;
}
