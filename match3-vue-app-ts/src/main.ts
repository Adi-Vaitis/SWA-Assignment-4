import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(PrimeVue, { unstyled: false });
app.use(router);

const options = {
  // You can set your default options here
};
app.use(Toast, options);
app.mount("#app");
