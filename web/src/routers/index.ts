import { useRouterAsync } from "@/hooks/useRouter";
import { useUserStore } from "@/store";
import { RouterAsyncRow } from "@/types/user";
import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouterAsyncRow[] = [
  {
    path: "/",
    component: () => import("../views/index.vue"),
    name: "home",
    meta: {
      title: "Home",
      isMenu: false,
      auth: true,
    },
  },
  {
    path: "/login",
    component: () => import("../views/login/login.vue"),
    name: "login",
    meta: {
      title: "login",
      auth: false,
      isMenu: false,
    },
  },
];

export async function createAppRouters(app: App) {
  const asyncRouter = await useRouterAsync();

  console.log(asyncRouter);

  const routerOptions = {
    history: createWebHistory(),
    routes,
  };

  const router = createRouter(routerOptions);

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
