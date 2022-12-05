import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dotenv from "dotenv";
import unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import autoImport from "unplugin-auto-import/vite";
import components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
// import { createStyleImportPlugin } from "vite-plugin-style-import";

export default defineConfig(() => {
  const { parsed } = dotenv.config();

  const proxyprefix = parsed["VITE_PROXY"];
  const proxytraget = parsed["VITE_TARGET"];

  return {
    plugins: [
      vue(),
      unocss({
        presets: [presetAttributify({}), presetUno({})],
      }),
      autoImport({
        resolvers: [ArcoResolver()],
      }),
      components({
        resolvers: [
          ArcoResolver({
            sideEffect: true,
          }),
        ],
      }),
    ],
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
