import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// types
const types = {
  SET_LOCATION: "setLocation",
  SET_ADDRESS: "setAddress",
  SET_SHOP_INFO: "setShopInfo"
};

export default new Vuex.Store({
  state: {
    location: {},
    address: "定位中...",
    shopInfo: {}
  },
  getters: {
    location: state => state.location,
    address: state => state.address,
    shopInfo: state => state.shopInfo
  },
  // 同步操作
  mutations: {
    [types.SET_LOCATION](state, location) {
      if (location) {
        state.location = location;
      } else {
        state.location = {};
      }
    },
    [types.SET_ADDRESS](state, address) {
      if (address) {
        state.address = address;
      } else {
        state.address = "定位中...";
      }
    },
    // 获取shopInfo
    [types.SET_SHOP_INFO](state, obj) {
      state.shopInfo = obj;
    }
  },
  // 异步操作
  actions: {
    setLocation({ commit }, location) {
      commit("setLocation", location);
    },
    setAddress({ commit }, address) {
      commit("setAddress", address);
    }
  }
});
