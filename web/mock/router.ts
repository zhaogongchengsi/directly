const routers = [
  {
    pid: 0,
    id: 1,
    path: "dashboard",
    component: "/views/dashboard",
    name: "dashboard",
    meta: {
      title: "体表盘",
      auth: false,
      isMenu: true,
    },
  },
  {
    pid: 0,
    id: 2,
    path: "list",
    component: "/views/list",
    name: "list",
    meta: {
      title: "表格",
      auth: false,
      isMenu: true,
    },
  },
  {
    pid: 1,
    id: 3,
    path: "workplace",
    component: "/views/dashboard/workplace.vue",
    name: "workplace",
    meta: {
      title: "仪表盘",
      auth: false,
      isMenu: true,
    },
  },
  {
    pid: 2,
    id: 4,
    path: "search-table",
    component: "/views/list/SearchTable.vue",
    name: "搜索表格",
    meta: {
      title: "搜索表格",
      auth: false,
      isMenu: true,
    },
  },
  {
    pid: 3,
    id: 5,
    path: "place",
    component: "/views/dashboard/piace.vue",
    name: "place",
    meta: {
      title: "操控台",
      auth: false,
      isMenu: true,
    },
  },
];

export default [
  {
    url: "/api/v1/router/routers",
    method: "get",
    response: () => {
      return {
        stateCode: 200,
        message: "ok",
        data: routers,
      };
    },
  },
];
