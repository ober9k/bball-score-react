import { logoutQueryOptions } from "@/apis/query-options.ts";
import LoginPage from "@/pages/auth/login-page";
import LogoutPage from "@/pages/auth/logout-page";
import { mapRoute } from "@/routes/route.ts";

async function logoutLoader({ context }) {
  return {
    logout: await context.queryClient.ensureQueryData(logoutQueryOptions)
  };
}

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
  loader: logoutLoader,
}];

export const authPaths = paths;
export const authRoutes = routes
  .map(mapRoute);
