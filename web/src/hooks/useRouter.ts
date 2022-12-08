import { getRoutersAsync } from "@/api/user";
import { RouterAsyncRow } from "@/types/user";

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
  const roorRouter = routers.filter(({ pid }) => {
    return pid === 0;
  });
  const childRouter = routers.filter(({ pid }) => {
    return pid != 0;
  });

  function componentReplace(router: RouterAsyncRow, module?: ImportModule) {
    router.component = module;
  }

  function toTree(prouter: RouterAsyncRow[], crouter: RouterAsyncRow[]) {
    prouter.forEach((pitem) => {
      const component = searchModuleComponent(pitem, modules);
      componentReplace(pitem, component);
      crouter.forEach((citem) => {
        componentReplace(citem, component);
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

export async function useRouterAsync() {
  try {
    const router = await getRoutersAsync();
    console.log(routerTravel(router, modulesOrganize(modules)));
  } catch (err) {
    console.log(err);
  }
}
