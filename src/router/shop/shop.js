import Shop from "@/views/shops/Shop";
import Goods from "@/views/shops/children/Goods";
import Comments from "@/views/shops/children/Comments";
import Seller from "@/views/shops/children/Seller";

export const ShopRouter = {
  path: "/shop",
  component: Shop,
  redirect: "/shop/goods",
  children: [
    { path: "/shop/goods", name: "goods", component: Goods },
    { path: "/shop/comments", name: "comments", component: Comments },
    { path: "/shop/seller", name: "seller", component: Seller }
  ]
};
