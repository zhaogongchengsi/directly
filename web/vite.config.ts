import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dotenv from "dotenv";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const { parsed } = dotenv.config();

  const proxyprefix = parsed["VITE_PROXY"];
  const proxytraget = parsed["VITE_TARGET"];

  return {
    plugins: [vue(), Unocss({})],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    server: {
      proxy: {
        [proxyprefix]: {
          target: proxytraget,
          changeOrigin: true,
          rewrite: (path: string) => {
            const reg = new RegExp("^\\" + proxyprefix + "/");
            return path.replace(reg, "");
          },
        },
      },
    },
  };
});
