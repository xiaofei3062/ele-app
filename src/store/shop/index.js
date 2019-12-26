import { types } from "../types";

export const ShopStore = {
  state: {
    shopInfo: {}
  },
  getters: {
    shopInfo: state => state.shopInfo
  },
  // 同步操作
  mutations: {
    // 获取shopInfo
    [types.SET_SHOP_INFO](state, obj) {
      state.shopInfo = obj;
    }
  },
  actions: {}
};
