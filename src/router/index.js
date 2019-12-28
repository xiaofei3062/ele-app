import Vue from "vue";
import VueRouter from "vue-router";

// 引入模块化路由
import { IndexRouter } from "./one/one";
import { ShopRouter } from "./shop/shop";
import { LoginRouter } from "./login/login";
// 引入数组路由
import { SingleRouter } from "./single/single";

Vue.use(VueRouter);

const routes = [
  IndexRouter,
  ShopRouter,
  LoginRouter,
  // 展开数组路由
  ...SingleRouter,
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

// 路由全局守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.ele_login;
  if (to.path === "/login") {
    next();
  } else {
    // 判断是否在登录状态下
    isLogin ? next() : next("/login");
  }
});

export default router;
