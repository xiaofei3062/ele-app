const MyAddress = () => import("@/views/mine/children/MyAddress");
const AddAddress = () => import("@/views/mine/children/AddAddress");
const Settlement = () => import("@/views/order/children/Settlement");
const Search = () => import("@/views/search/Search");
const Pay = () => import("@/views/order/children/Pay");

export const SingleRouter = [
  { path: "/myAddress", name: "myAddress", component: MyAddress },
  { path: "/addAddress", name: "addAddress", component: AddAddress },
  { path: "/settlement", name: "settlement", component: Settlement },
  { path: "/search", name: "search", component: Search },
  { path: "/pay", name: "pay", component: Pay }
];
