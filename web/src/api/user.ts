import { Get } from "@/utils/http";

export async function getCaptcha() {
  return await Get(`user/captcha`);
}
