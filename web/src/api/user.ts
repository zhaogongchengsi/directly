import { Get, HttpParams, Post } from "@/utils/http";

export async function getCaptcha<T>(params?: HttpParams) {
  return await Get<T>(`user/captcha`, params);
}

export async function Login(userinfo: any) {
  return await Post(`user/login`, userinfo);
}
