import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_PROXY,
});

export function Get(url: string) {
  return http.get(url);
}
