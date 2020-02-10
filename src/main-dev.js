import Vue from "vue";
import "./axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 全局引入mint-ui
import MINT from "mint-ui";
import "mint-ui/lib/style.css";
// 全局引入vant
import vant from "vant";
import "vant/lib/index.css";
// 全局样式
import "./assets/css/reset.css";

Vue.use(MINT);
Vue.use(vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
