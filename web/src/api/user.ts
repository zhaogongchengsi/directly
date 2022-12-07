import { Get } from "@/utils/http";

export async function getCaptcha<T>(params?: Record<string, string | number>) {
  return await Get<T>(`user/captcha`, params);
}
