const Login = () => import("@/views/login/Login");

export const LoginRouter = {
  path: "/login",
  name: "login",
  component: Login
};
