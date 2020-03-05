import axios from "axios";
import qs from "qs";

let config = {
  baseURL: "http://127.0.0.1:5000",
  timeout: 10000
};

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
  req => {
    if (req.method === "post" || req.method === "POST") {
      req.data = qs.stringify(req.data);
    }
    return req;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截
_axios.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    return Promise.reject(err);
  }
);

// 全局注册axios
window.axios = _axios;
