import Vue from "vue";
import VueRouter from "vue-router";

// 路由懒加载
const Index = () => import("@/views/Index");
const Login = () => import("@/views/Login");
const Home = () => import("@/views/Home");
const Mine = () => import("@/views/Mine");
const Order = () => import("@/views/Order");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      { path: "", redirect: "home" },
      { path: "/home", name: "home", component: Home },
      { path: "/mine", name: "mine", component: Mine },
      { path: "/order", name: "order", component: Order }
    ]
  },
  { path: "/login", name: "login", component: Login }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.ele_login;
  if (to.path === "/login") {
    next();
  } else {
    // 是否在登录状态下
    isLogin ? next() : next("/login");
  }
});

export default router;
