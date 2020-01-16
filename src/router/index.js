import Vue from "vue";
import VueRouter from "vue-router";

// 重写路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 重写路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

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
  if (to.path === "/login") return next();
  // 判断是否在登录状态下
  isLogin ? next() : next("/login");
});

export default router;
