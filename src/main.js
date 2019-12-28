import Vue from "vue";
import "./axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 按需引入mint-ui
import { Loadmore, InfiniteScroll } from "mint-ui";
import "mint-ui/lib/style.css";
// 全局引入vant
import Vant from "vant";
import "vant/lib/index.css";
// 全局样式
import "./assets/css/reset.css";

Vue.component(Loadmore.name, Loadmore);

Vue.use(InfiniteScroll);
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
