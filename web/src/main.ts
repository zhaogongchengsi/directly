import { createApp } from "vue";
import App from "./App.vue";

import "./style";

import { createAppRouters } from "./routers";
import { createAppStore } from "./store";

const app = createApp(App);

async function bootstrap() {
  createAppStore(app);
  await createAppRouters(app);
  app.mount("#app");
}

bootstrap();
