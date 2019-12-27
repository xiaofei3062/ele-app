const MyAddress = () => import("@/views/mine/children/MyAddress");
const AddAddress = () => import("@/views/mine/children/AddAddress");
const Search = () => import("@/views/search/Search");

export const SingleRouter = [
  { path: "/myAddress", name: "myAddress", component: MyAddress },
  { path: "/addAddress", name: "addAddress", component: AddAddress },
  { path: "/search", name: "search", component: Search }
];
