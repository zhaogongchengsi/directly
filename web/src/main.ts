import { createApp } from "vue";
import App from "./App.vue";

import "uno.css";

// 单独引入 message 的css样式
import "@arco-design/web-vue/es/message/style/css.js";
import "@unocss/reset/tailwind.css";
import "./style.css";

import { createAppRouters } from "./routers";
import { createAppStore } from "./store";

const app = createApp(App);

async function bootstrap() {
  createAppRouters(app);
  createAppStore(app);
  app.mount("#app");
}

bootstrap();
