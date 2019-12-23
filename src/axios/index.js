"use strict";

import axios from "axios";
import { Toast } from "vant";

let config = {
  // baseURL:""
};

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
  req => {
    Toast.loading({
      forbidClick: true,
      message: "加载中..."
    });
    return req;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截
_axios.interceptors.response.use(
  res => {
    Toast.clear();
    return res.data;
  },
  err => {
    Toast.clear();
    return Promise.reject(err);
  }
);

// 全局注册axios
window.axios = _axios;
