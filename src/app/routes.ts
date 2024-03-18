import LoginPage from "../pages/auth/Login";
import IRoute from "../interfaces/route";
import SignUpPage from "../pages/auth/Signup";

const routes: IRoute[] = [
  {
    path: "/Login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/Register",
    name: "Register",
    component: SignUpPage,
  }
];

export default routes;
