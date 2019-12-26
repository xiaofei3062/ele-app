import Vue from "vue";
import Vuex from "vuex";

// 引入模块化vuex
import { LocationStore } from "./location";
import { ShopStore } from "./shop";

Vue.use(Vuex);

export default new Vuex.Store({
  // vuex模块化
  modules: {
    LocationStore,
    ShopStore
  }
});
