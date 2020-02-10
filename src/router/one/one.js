// 一级路由
const Index = () => import(/* webpackChunkName: 'one' */ "@/views/Index");

// tabBar路由
const Home = () => import(/* webpackChunkName: 'one' */ "@/views/home/Home");
const Order = () => import(/* webpackChunkName: 'one' */ "@/views/order/Order");
const Mine = () => import(/* webpackChunkName: 'one' */ "@/views/mine/Mine");

// 二级路由
const Address = () => import(/* webpackChunkName: 'one' */ "@/views/home/children/Address");
const City = () => import(/* webpackChunkName: 'one' */ "@/views/home/children/City");

export const IndexRouter = {
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
};
