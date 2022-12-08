import { useRouterAsync } from "@/hooks/useRouter";
import { useUserStore } from "@/store";
import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createDefaultRouter } from "./base";

export async function createAppRouters(app: App) {
  const asyncRouters = await useRouterAsync();

  const router = createRouter({
    history: createWebHistory(),
    routes: createDefaultRouter(asyncRouters),
  });

  router.beforeEach((to, from) => {
    if (!to?.meta.auth || to.name === "login") {
      return true;
    }

    const user = useUserStore();

    if (!user.logined && !user.token) {
      return { path: "/login" };
    }

    return true;
  });

  app.use(router);
  return app;
}
