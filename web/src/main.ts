import { createApp } from "vue";
import App from "./App.vue";

import "./style";

import { createAppRouters } from "./routers";
import { createAppStore } from "./store";

const app = createApp(App);

async function bootstrap() {
  createAppRouters(app);
  createAppStore(app);
  app.mount("#app");
}

bootstrap();
