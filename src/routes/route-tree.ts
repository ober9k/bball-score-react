import { authUserQueryOptions } from "@/apis/query-options.ts";
import DefaultLayout from "@/layouts/default-layout";
import AboutPage from "@/pages/about-page";
import HomePage from "@/pages/home-page";
import { authRoutes } from "@/routes/auth/routes.ts";
import { leagueRoutes } from "@/routes/league/routes";
import { managerRoutes } from "@/routes/manager/routes.ts";
import { createRootRoute, createRoute } from "@tanstack/react-router";

/**
 * Handle an initial load for the user's authentication.
 * This will work via ref to actively update the data.
 * @param context
 */
const rootBeforeLoader = async ({ context }) => {
  const { queryClient, authContext } = context;
  const user = await queryClient.ensureQueryData(authUserQueryOptions);
  authContext.userRef.current = { ...user }; /* use ref instead */
}

export const rootRoute = createRootRoute({
  component: DefaultLayout,
  beforeLoad: rootBeforeLoader,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  ...authRoutes,
  ...leagueRoutes,
  ...managerRoutes,
]);
