const MyAddress = () => import(/* webpackChunkName: 'single' */ "@/views/mine/children/MyAddress");
const AddAddress = () =>
  import(/* webpackChunkName: 'single' */ "@/views/mine/children/AddAddress");
const Settlement = () =>
  import(/* webpackChunkName: 'single' */ "@/views/order/children/Settlement");
const Search = () => import(/* webpackChunkName: 'single' */ "@/views/search/Search");
const Pay = () => import(/* webpackChunkName: 'single' */ "@/views/order/children/Pay");

export const SingleRouter = [
  { path: "/myAddress", name: "myAddress", component: MyAddress },
  { path: "/addAddress", name: "addAddress", component: AddAddress },
  { path: "/settlement", name: "settlement", component: Settlement },
  { path: "/search", name: "search", component: Search },
  { path: "/pay", name: "pay", component: Pay }
];
