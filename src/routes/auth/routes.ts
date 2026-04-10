import LoginPage from "@/pages/auth/login-page";
import LogoutPage from "@/pages/auth/logout-page";
import { mapRoute } from "@/routes/route.ts";

const paths = {
  "Login":  "/auth/login",
  "Logout": "/auth/logout",
};

const routes = [{
  path: paths.Login,
  component: LoginPage,
},{
  path: paths.Logout,
  component: LogoutPage,
}];

export const authPaths = paths;
export const authRoutes = routes
  .map(mapRoute);
