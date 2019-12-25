// 一级路由
const Index = () => import("@/views/Index");
// 二级路由
const Home = () => import("@/views/home/Home");
const Mine = () => import("@/views/mine/Mine");
const Order = () => import("@/views/order/Order");
const Address = () => import("@/views/home/children/Address");
const City = () => import("@/views/home/children/City");

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
