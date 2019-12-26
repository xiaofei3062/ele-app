import { types } from "../types";

export const LocationStore = {
  state: {
    location: {},
    address: "定位中..."
  },
  getters: {
    location: state => state.location,
    address: state => state.address
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
};
