import { getRoutersAsync } from "@/api/user";
import { RouterAsyncRow } from "@/types/user";
import ComponentNotExit from "@/layouts/ComponNotExist/index.vue";
import { TOKEN_KEY } from "@/utils/http";

const modules = import.meta.glob("../views/**/*.vue");

// 匹配路径前缀 ./ ../ ..\ .\
const PATH_REG = /^(\.{0,2}[\/\\])/gm;
const FILESUF_REG = /.*(\.vue|js|jsx|ts|tsx)$/;

export type ImportModule = () => Promise<unknown>;
export type Modules = Record<string, ImportModule>;
export type ModulesMap = Map<string, ImportModule>;

function searchModuleComponent(router: RouterAsyncRow, modules: ModulesMap): ImportModule | undefined {
  if (typeof router === "function") {
    return router;
  }
  const component: string = router.component as string;
  const isExt = FILESUF_REG.test(component);
  const componetName = (isExt ? component : component + ".vue").replace(PATH_REG, "");
  let module = modules.get(componetName);

  if (!module) {
    if (isExt) {
      // 文件没找到
      return undefined;
    } else {
      const newName = [component, "index.vue"].join("/").replace(PATH_REG, "");
      let module = modules.get(newName);
      if (module) {
        return module;
      } else {
        // 文件没找到
        return undefined;
      }
    }
  }

  return module;
}

function modulesOrganize(modules: Modules) {
  const modulesMap = new Map<string, ImportModule>();
  Object.entries(modules).forEach(([name, module]) => {
    modulesMap.set(name.replace(PATH_REG, ""), module);
  });
  return modulesMap;
}

function routerTravel(routers: RouterAsyncRow[], modules: ModulesMap) {
  const _router = routers.map((r) => {
    const component = searchModuleComponent(r, modules);
    componentReplace(r, component);
    return r;
  });

  const roorRouter = _router.filter(({ pid }) => {
    return pid === 0;
  });
  const childRouter = _router.filter(({ pid }) => {
    return pid != 0;
  });

  function componentReplace(router: RouterAsyncRow, module?: ImportModule) {
    if (!module) {
      // 路由不存在替换为 异常组件
      router.component = ComponentNotExit;
    } else {
      router.component = module;
    }
  }

  function toTree(prouter: RouterAsyncRow[], crouter: RouterAsyncRow[]) {
    prouter.forEach((pitem) => {
      crouter.forEach((citem) => {
        if (pitem.id === citem.pid) {
          toTree([citem], crouter);
          if (pitem.children) {
            pitem.children.push(citem);
          } else {
            pitem.children = [citem];
          }
        }
      });
    });

    return prouter;
  }

  return toTree(roorRouter, childRouter);
}

/**
 *
 * @description 将后端请求过来的扁平化路由数据 转化为真实的路由树形数据 并且将组件替换为真实的组件
 */
export async function useRouterAsync() {
  // const token = window.localStorage.getItem(TOKEN_KEY);

  // if (!token) {
  //   window.location.href = "/login";
  //   return [];
  // }

  try {
    const router = await getRoutersAsync();
    const routerRec = routerTravel(router, modulesOrganize(modules));
    return routerRec;
  } catch (err) {
    console.log(err);
    return [];
  }
}
