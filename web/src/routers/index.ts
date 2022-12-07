import { useUserStore } from "@/store";
import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/index.vue"), name: "home" },
  {
    path: "/login",
    component: () => import("../views/login/login.vue"),
    name: "login",
  },
];

export function createAppRouters(app: App) {
  const routerOptions = {
    history: createWebHistory(),
    routes,
  };

  const router = createRouter(routerOptions);

  router.beforeEach((to, from) => {
    console.log("from", from);
    const user = useUserStore();

    return true;
  });

  app.use(router);
  return app;
}
