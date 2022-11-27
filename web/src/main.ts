import { createApp } from 'vue'
import App from './App.vue'

import "uno.css";
import "@unocss/reset/tailwind.css";
import "./style.css";

import { createAppRouters } from './routers'
import { createAppStore } from './store'


const app = createApp(App)
createAppRouters(app)
createAppStore(app);
app.mount('#app')
