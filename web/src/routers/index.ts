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
    const user = useUserStore();
    if (to.name === "login") {
      return true;
    }

    if (!user.logined) {
      return { path: "/login" };
    }

    return true;
  });

  app.use(router);
  return app;
}
