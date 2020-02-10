import Index from "@/views/Index";
import Home from "@/views/home/Home";
import Mine from "@/views/mine/Mine";
import Order from "@/views/order/Order";
import Address from "@/views/home/children/Address";
import City from "@/views/home/children/City";

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
