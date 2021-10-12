import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

require('./styles/main.scss');

createApp(App).use(router).mount("#app");
