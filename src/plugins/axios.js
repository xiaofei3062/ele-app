"use strict";

import Vue from "vue";
import axios from "axios";
import { Toast } from "vant";

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 10 * 1000
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    Toast.loading({
      forbidClick: true,
      message: "加载中..."
    });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    Toast.clear();
    return response.data;
  },
  function (error) {
    Toast.clear();
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
