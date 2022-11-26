import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const { parsed } = dotenv.config();

  const proxySu = parsed["VITE_PROXY"];

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    server: {
      proxy: {
        [proxySu]: {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => {
            const reg = new RegExp("^\\" + proxySu + "/");
            console.log(reg);
            return path.replace(reg, "");
          },
        },
      },
    },
  };
});
