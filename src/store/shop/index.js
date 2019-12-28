import { types } from "../types";

export const ShopStore = {
  state: {
    shopInfo: {},
    orderInfo: []
  },
  getters: {
    shopInfo: state => state.shopInfo,
    orderInfo: state => state.orderInfo
  },
  // 同步操作
  mutations: {
    // 获取shopInfo
    [types.SET_SHOP_INFO](state, obj) {
      state.shopInfo = obj;
    },
    // 获取orderInfo
    [types.SET_ORDER_INFO](state, orderInfo) {
      if (orderInfo) {
        state.orderInfo = orderInfo;
      } else {
        state.orderInfo = {};
      }
    }
  },
  actions: {
    setOrderInfo({ commit }, orderInfo) {
      commit("setOrderInfo", orderInfo);
    }
  }
};
