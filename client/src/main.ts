import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './assets/tailwind.css'

require('./styles/main.scss');

createApp(App)
  .use(router)
  .mount("#app");
