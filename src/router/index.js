import Vue from "vue";
import VueRouter from "vue-router";

// 一级路由
const Index = () => import("@/views/Index");
const Login = () => import("@/views/login/Login");
const Search = () => import("@/views/search/Search");

// 二级路由
const Home = () => import("@/views/home/Home");
const Mine = () => import("@/views/mine/Mine");
const Order = () => import("@/views/order/Order");
const Address = () => import("@/views/home/children/Address");
const City = () => import("@/views/home/children/City");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      { path: "", redirect: "home" },
      { path: "/home", name: "home", component: Home },
      { path: "/mine", name: "mine", component: Mine },
      { path: "/order", name: "order", component: Order },
      { path: "/address", name: "address", component: Address },
      { path: "/city", name: "city", component: City }
    ]
  },
  { path: "/login", name: "login", component: Login },
  { path: "/search", name: "search", component: Search },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
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
