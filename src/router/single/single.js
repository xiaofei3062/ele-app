import MyAddress from "@/views/mine/children/MyAddress";
import AddAddress from "@/views/mine/children/AddAddress";
import Settlement from "@/views/order/children/Settlement";
import Search from "@/views/search/Search";
import Pay from "@/views/order/children/Pay";

export const SingleRouter = [
  { path: "/myAddress", name: "myAddress", component: MyAddress },
  { path: "/addAddress", name: "addAddress", component: AddAddress },
  { path: "/settlement", name: "settlement", component: Settlement },
  { path: "/search", name: "search", component: Search },
  { path: "/pay", name: "pay", component: Pay }
];
