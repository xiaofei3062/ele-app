import Shop from "@/views/shops/Shop";
import Goods from "@/views/shops/children/Goods";
import Comments from "@/views/shops/children/Comments";
import Seller from "@/views/shops/children/Seller";

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
