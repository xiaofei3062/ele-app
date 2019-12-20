import Vue from "vue";
import VueRouter from "vue-router";

// 一级路由
const Index = () => import("@/views/Index");
const Login = () => import("@/views/login/Login");
const Search = () => import("@/views/search/Search");
const Shop = () => import("@/views/shops/Shop");

// 二级路由
const Home = () => import("@/views/home/Home");
const Mine = () => import("@/views/mine/Mine");
const Order = () => import("@/views/order/Order");
const Address = () => import("@/views/home/children/Address");
const City = () => import("@/views/home/children/City");
const Goods = () => import("@/views/shops/children/Goods");
const Comments = () => import("@/views/shops/children/Comments");
const Seller = () => import("@/views/shops/children/Seller");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      { path: "", redirect: "home" },
      { path: "home", name: "home", component: Home },
      { path: "mine", name: "mine", component: Mine },
      { path: "order", name: "order", component: Order },
      { path: "address", name: "address", component: Address },
      { path: "city", name: "city", component: City }
    ]
  },
  { path: "/login", name: "login", component: Login },
  { path: "/search", name: "search", component: Search },
  {
    path: "/shop",
    component: Shop,
    children: [
      { path: "", redirect: "goods" },
      { path: "goods", name: "goods", component: Goods },
      { path: "comments", name: "comments", component: Comments },
      { path: "seller", name: "seller", component: Seller }
    ]
  },
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
