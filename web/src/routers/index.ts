import { useRouterAsync } from "@/hooks/useRouter";
import { useUserStore } from "@/store";
import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createDefaultRouter } from "./base";

export async function createAppRouters(app: App) {
  try {
    const asyncRouters = await useRouterAsync();

    const router = createRouter({
      history: createWebHistory(),
      routes: createDefaultRouter(asyncRouters),
    });

    router.beforeEach((to, from) => {
      if (!from.name) {
        console.log(`刷新`);
      }

      if ((to?.meta.auth != undefined && to?.meta.auth != false) || to.name === "login") {
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
  } catch (err) {
    console.error(err);
  }
}
