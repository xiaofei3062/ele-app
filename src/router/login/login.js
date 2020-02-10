const Login = () => import(/* webpackChunkName: 'login' */ "@/views/login/Login");

export const LoginRouter = {
  path: "/login",
  name: "login",
  component: Login
};
