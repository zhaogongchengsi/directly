import { createApp } from "vue";
import App from "./App.vue";

import "./style";

import { createAppRouters } from "./routers";
import { createAppStore } from "./store";
import CustomRouterView from "./components/CustomVIew/index.vue";

const app = createApp(App);

async function bootstrap() {
  app.component("CustomRouterView", CustomRouterView);
  createAppStore(app);
  await createAppRouters(app);
  app.mount("#app");
}

bootstrap();
