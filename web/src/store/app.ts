import { defineStore } from "pinia";
import { Ref, ref, watch, isRef } from "vue";
import { RouteLocationNormalizedLoaded, useRouter } from "vue-router";

const routerFormat = (router: Ref<RouteLocationNormalizedLoaded> | RouteLocationNormalizedLoaded) => {
  const { path, meta, name } = isRef<RouteLocationNormalizedLoaded>(router) ? router.value : router;
  return { path, name: name as string | undefined, title: meta.title, icon: meta.icon };
};

export type HistoryRecord = ReturnType<typeof routerFormat>;

export const useAppStore = defineStore("appStort", () => {
  const router = useRouter();
  const routerHistory = ref<HistoryRecord[]>([routerFormat(router.currentRoute)]);
  const currentRoute = ref<HistoryRecord>(routerFormat(router.currentRoute));

  const findRecord = ({ name, path }: { name?: string; path?: string }) => {
    return routerHistory.value.find((rec) => {
      return rec.name === name && rec.path === path;
    });
  };

  const hasRouter = ({ name, path }: HistoryRecord) => {
    const rec = findRecord({ name, path });
    if (rec) {
      return true;
    } else {
      return false;
    }
  };

  const pushTab = (router: RouteLocationNormalizedLoaded) => {
    const _router = routerFormat(router);
    if (hasRouter(_router)) {
      currentRoute.value = _router;
    } else {
      routerHistory.value = routerHistory.value.concat([_router]);
    }
  };

  watch(router.currentRoute, (newRouter) => {
    pushTab(newRouter);
  });

  return {
    routerHistory,
    currentRoute,
    pushTab,
    hasRouter,
    findRecord,
  };
});
