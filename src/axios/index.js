"use strict";

import Vue from "vue";
import axios from "axios";
import { Toast } from "vant";

let config = {
  // baseURL:""
};

const _axios = axios.create(config);

// 请求拦截
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

// 响应拦截
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

// 全局注册axios
Vue.axios = _axios;
window.axios = _axios;
