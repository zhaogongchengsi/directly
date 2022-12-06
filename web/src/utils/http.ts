import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_PROXY,
  timeout: 5000,
});

http.interceptors.request.use(
  function (config) {
    const token = "123123123123123asdjasdoi";
    config.headers && (config.headers["token"] = token);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function Get(url: string) {
  return http.get(url);
}

export function Post<T>(url: string, data: any): Promise<T> {
  return http.post(url, data);
}
