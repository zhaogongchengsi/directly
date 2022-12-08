import { createApp } from "vue";
import App from "./App.vue";

import ArcoVueIcon from "@arco-design/web-vue/es/icon";

import "./style";

import { createAppRouters } from "./routers";
import { createAppStore } from "./store";
import CustomRouterView from "./components/CustomVIew/index.vue";

const app = createApp(App);

async function bootstrap() {
  app.component("CustomRouterView", CustomRouterView);
  app.use(ArcoVueIcon);
  
  createAppStore(app);
  await createAppRouters(app);
  app.mount("#app");
}

bootstrap();
