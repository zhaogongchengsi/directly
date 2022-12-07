import { getRoutersAsync } from "@/api/user";
import { RouterAsyncRow } from "@/types/user";

function routerReplace(routers: RouterAsyncRow[], modules: any) {}

export async function useRouterAsync() {
  try {
    const router = await getRoutersAsync();

    console.log(router);
  } catch (err) {
    console.log(err);
  }
}
