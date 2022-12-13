import { defineStore } from "pinia";
import { Ref, ref, watch, isRef, computed } from "vue";
import { RouteLocationNormalizedLoaded, useRouter } from "vue-router";

const routerFormat = (router: Ref<RouteLocationNormalizedLoaded> | RouteLocationNormalizedLoaded) => {
  const { path, meta, name } = isRef<RouteLocationNormalizedLoaded>(router) ? router.value : router;
  return { path, name: name as string | undefined, title: meta.title as string, icon: meta.icon as string };
};

export type HistoryRecord = ReturnType<typeof routerFormat>;

export const useTabsStore = defineStore("tabsStort", () => {
  const router = useRouter();
  const routerHistory = ref<HistoryRecord[]>([routerFormat(router.currentRoute)]);
  const currentPointer = ref<number>(0);
  const currentRoute = computed(() => {
    return routerHistory.value[currentPointer.value];
  });

  /**
   *
   * @param name 路由名字
   * @param path 路由路径
   * @desc 在历史记录中查找符合条件的路由
   */
  const findRecord = (name?: string, path?: string) => {
    return routerHistory.value.find((rec) => {
      return rec.name === name && rec.path === path;
    });
  };

  /**
   *
   * @param name 路由名字
   * @param path 路由路径
   * @desc 在历史记录中查找符合条件的路由的索引
   */
  const findRecordIndex = (name?: string, path?: string) => {
    return routerHistory.value.findIndex((rec) => {
      return rec.name === name && rec.path === path;
    });
  };

  /**
   * @desc 查找此历史记录是否存在
   */
  const hasRouter = ({ name, path }: HistoryRecord) => {
    const rec = findRecord(name, path);
    if (rec) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @desc 设置当前激活路由的指针
   */
  const setCurrentPointer = (index: number) => {
    currentPointer.value = index;
  };

  /**
   * @desc 添加一条历史记录
   */
  const pushHistory = (router: RouteLocationNormalizedLoaded) => {
    const _router = routerFormat(router);
    if (!hasRouter(_router)) {
      routerHistory.value = routerHistory.value.concat([_router]);
    }
    setCurrentPointer(findRecordIndex(_router.name, _router.path));
  };

  // 删除逻辑待开发
  const deleteTab = (name: string, path: string) => {
    let deleteIndex: number;
    let activeIndex: number = currentPointer.value;
    const newHistory = routerHistory.value.filter((item, index) => {
      if (item.name === currentRoute.value.name && item.path === currentRoute.value.path) {
        activeIndex = index;
      }
      if (item.name !== name && item.path != path) {
        return true;
      }
      deleteIndex = index;
      return false;
    });
    // const after = newHistory.length;
    const direction = deleteIndex! - activeIndex;
    if (direction >= 1) {
      // console.log(`删除右边`);
      setCurrentPointer(deleteIndex! - 1);
    } else {
      // console.log(`删除左边`);
      // 删除的记录在激活记录的左边 指针右移
      setCurrentPointer(activeIndex - 1);
    }
    routerHistory.value = newHistory;
  };

  watch(router.currentRoute, (newRouter) => {
    pushHistory(newRouter);
  });

  return {
    routerHistory,
    currentRoute,
    currentPointer,
    pushHistory,
    hasRouter,
    findRecord,
    deleteTab,
    setCurrentPointer,
  };
});
