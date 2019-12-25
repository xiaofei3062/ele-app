import Vue from "vue";
import VueRouter from "vue-router";

// 引入模块化路由
import { IndexRouter } from "./one";
import { ShopRouter } from "./shop";
import { LoginRouter } from "./login";
import { SearchRouter } from "./search";

Vue.use(VueRouter);

const routes = [
  IndexRouter,
  ShopRouter,
  LoginRouter,
  SearchRouter,
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
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
