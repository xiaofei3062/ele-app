import axios from "axios";
import qs from "qs";
import { Toast } from "vant";

let config = {
  baseURL: "http://127.0.0.1:5000"
};

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
  req => {
    if (req.method === "post") {
      req.data = qs.stringify(req.data);
    }
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
