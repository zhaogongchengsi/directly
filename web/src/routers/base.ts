import { RouterAsyncRow } from "@/types/user";
import NotFound from "@/components/NotFound.vue";

export const LOGIN_PAGE = {
  path: "/login",
  component: () => import("../views/login/login.vue"),
  name: "login",
  meta: {
    title: "login",
    auth: false,
    isMenu: false,
  },
};

export const NOT_FOUND_PAGE = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: NotFound,
  meta: {
    title: "NotFound",
    auth: false,
    isMenu: false,
  },
};

export function createDefaultRouter(children?: RouterAsyncRow[]): RouterAsyncRow[] {
  return [
    {
      path: "/",
      component: () => import("../views/index.vue"),
      name: "home",
      meta: {
        title: "Home",
        isMenu: false,
        auth: true,
      },
      children: children || [],
    },
    LOGIN_PAGE,
    NOT_FOUND_PAGE,
  ];
}
