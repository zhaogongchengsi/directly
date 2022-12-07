import axios, { AxiosResponse } from "axios";

export interface HttpResponse<T extends any> {
  stateCode: number;
  data: T;
  err?: string;
  message: string;
}

const http = axios.create({
  baseURL: import.meta.env.VITE_PROXY,
  timeout: 5000,
});

http.interceptors.request.use(
  function (config) {
    const token = "123123123123123asdjasdoi";
    config.headers && (config.headers["Authorization"] = `Bearer ${token}`);
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

export function Get<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    http
      .get<any, AxiosResponse<HttpResponse<T>, any>, any>(url)
      .then((res) => {
        const { data } = res;
        if (data.stateCode === 200) {
          resolve(res.data.data);
        } else {
          reject(data.err);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function Post<T>(url: string, data: any): Promise<T> {
  return new Promise((resolve, reject) => {
    http
      .post<any, AxiosResponse<HttpResponse<T>, any>, any>(url, data)
      .then((res) => {
        const { data } = res;
        if (data.stateCode === 200) {
          resolve(res.data.data);
        } else {
          reject(data.err);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
