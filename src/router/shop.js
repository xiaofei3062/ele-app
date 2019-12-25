const Shop = () => import("@/views/shops/Shop");

// 二级路由
const Goods = () => import("@/views/shops/children/Goods");
const Comments = () => import("@/views/shops/children/Comments");
const Seller = () => import("@/views/shops/children/Seller");

export const ShopRouter = {
  path: "/shop",
  component: Shop,
  children: [
    { path: "", redirect: "goods" },
    { path: "goods", name: "goods", component: Goods },
    { path: "comments", name: "comments", component: Comments },
    { path: "seller", name: "seller", component: Seller }
  ]
};
