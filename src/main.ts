import AppButton from "@/components/AppButton.vue";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles.scss";
import router from "./router";

const app = createApp(App);

app.component("AppButton", AppButton);

app.use(router).mount("#app");
