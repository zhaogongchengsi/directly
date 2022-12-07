import { getRoutersAsync } from "@/api/user";

export async function useRouterAsync() {
  try {
    const router = await getRoutersAsync();

    console.log(router);
  } catch (err) {
    console.log(err);
  }
}
