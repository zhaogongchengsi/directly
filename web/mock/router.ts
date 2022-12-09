import mock from "mockjs";

const routers = [
  {
    pid: 0,
    id: 1,
    path: "dashboard",
    component: "/views/dashboard",
    name: "dashboard",
    meta: {
      title: "仪表盘",
      auth: false,
      isMenu: true,
      icon: "icon-dashboard",
    },
  },
  {
    pid: 0,
    id: 2,
    path: "list",
    component: "/views/list",
    name: "list",
    meta: {
      title: "列表页",
      auth: false,
      isMenu: true,
      icon: "icon-unordered-list",
    },
  },
  {
    pid: 1,
    id: 3,
    path: "workplace",
    component: "/views/dashboard/workplace.vue",
    name: "workplace",
    meta: {
      title: "工作台",
      auth: false,
      isMenu: true,
      icon: "icon-common",
    },
  },
  {
    pid: 2,
    id: 4,
    path: "search-table",
    component: "/views/list/SearchTable.vue",
    name: "searchTable",
    meta: {
      title: "搜索表格",
      auth: false,
      isMenu: true,
      icon: "icon-fire",
    },
  },
  {
    pid: 0,
    id: 6,
    path: "notComponent",
    component: "/views/notComponent",
    name: "notExist",
    meta: {
      title: "异常组件",
      auth: false,
      isMenu: true,
      icon: "icon-exclamation-polygon-fill",
    },
  },
];

const validPperiod = 1000 * 60 * 60;

export default [
  {
    url: "/api/v1/router/routers",
    method: "get",
    response: (req: any) => {
      const isOk = verifiToken(req.headers.authorization);
      if (!isOk) {
        req.headers["new-token"] = mock.Random.word(20, 50) + "-" + Date.now();
      }
      return {
        stateCode: 200,
        message: "ok",
        data: routers,
      };
    },
  },
];

function verifiToken(tokenstr: string) {
  const token = tokenstr.split(" ")[1];
  const time = token.split("-")[1];
  return Number(time + validPperiod) > Date.now();
}
