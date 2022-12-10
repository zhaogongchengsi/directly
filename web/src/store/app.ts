import { defineStore } from "pinia";
import { Ref, ref, watch, isRef, computed } from "vue";
import { RouteLocationNormalizedLoaded, useRouter } from "vue-router";

const routerFormat = (router: Ref<RouteLocationNormalizedLoaded> | RouteLocationNormalizedLoaded) => {
  const { path, meta, name } = isRef<RouteLocationNormalizedLoaded>(router) ? router.value : router;
  return { path, name: name as string | undefined, title: meta.title as string, icon: meta.icon as string };
};

export type HistoryRecord = ReturnType<typeof routerFormat>;

export const useAppStore = defineStore("appStort", () => {
  const router = useRouter();
  const routerHistory = ref<HistoryRecord[]>([routerFormat(router.currentRoute)]);
  const currentPointer = ref<number>(0);
  const currentRoute = computed(() => {
    return routerHistory.value[currentPointer.value];
  });

  const findRecord = (name?: string, path?: string) => {
    return routerHistory.value.find((rec) => {
      return rec.name === name && rec.path === path;
    });
  };

  const findRecordIndex = (name?: string, path?: string) => {
    return routerHistory.value.findIndex((rec) => {
      return rec.name === name && rec.path === path;
    });
  };

  const hasRouter = ({ name, path }: HistoryRecord) => {
    const rec = findRecord(name, path);
    if (rec) {
      return true;
    } else {
      return false;
    }
  };

  const pushTab = (router: RouteLocationNormalizedLoaded) => {
    const _router = routerFormat(router);
    if (hasRouter(_router)) {
      currentPointer.value = findRecordIndex(_router.name, _router.path);
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
    currentPointer,
    pushTab,
    hasRouter,
    findRecord,
  };
});
