import { getRoutersAsync } from "@/api/user";
import { RouterAsyncRow } from "@/types/user";

const modules = import.meta.glob("../views/*.vue");

function routerTravel(routers: RouterAsyncRow[], modules: any) {
  const roorRouter = routers.filter(({ pid }) => {
    return pid === 0;
  });
  const childRouter = routers.filter(({ pid }) => {
    return pid != 0;
  });

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

export async function useRouterAsync() {
  try {
    const router = await getRoutersAsync();

    console.log(router);

    console.log(routerTravel(router, modules));
  } catch (err) {
    console.log(err);
  }
}
