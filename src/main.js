import Vue from "vue";
import "./axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "mint-ui/lib/style.css";
import Vant from "vant";
import "vant/lib/index.css";
import { Loadmore, InfiniteScroll } from "mint-ui";

Vue.component(Loadmore.name, Loadmore);

Vue.use(Vant);
Vue.use(InfiniteScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
