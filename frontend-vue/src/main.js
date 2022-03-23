import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";

import VueCookie from "vue-cookie";

import App from "./App.vue";

import router from "./plugins/router";
import vuetify from "./plugins/vuetify";

// eslint-disable-next-line no-unused-vars
import base from "./plugins/base";

import "@mdi/font/css/materialdesignicons.css";
import moment from "moment";

import VueLogger from "vuejs-logger";

import { createPinia, PiniaVuePlugin } from "pinia";

const loggerOptions = {
  isEnabled: true,
  logLevel: process.env.NODE_ENV === "production" ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
};

Vue.prototype.moment = moment;
Vue.config.productionTip = false;

// Vue.use(VeeValidate)
Vue.use(VueCompositionAPI);

Vue.use(VueLogger, loggerOptions);
Vue.use(VueCookie);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

const app = new Vue({
  router,
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount("#app");

window.App = app;
