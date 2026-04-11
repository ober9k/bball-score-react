import { logoutQueryOptions } from "@/apis/query-options.ts";
import LoginPage from "@/pages/auth/login-page";
import LogoutPage from "@/pages/auth/logout-page";
import ErrorPage from "@/pages/league/errors/error-page.tsx";
import UnauthorizedPage from "@/pages/league/errors/unauthorized-page.tsx";
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
  errorComponent: ErrorPage,
  loader: logoutLoader,
}];

export const authPaths = paths;
export const authRoutes = routes
  .map(mapRoute);
