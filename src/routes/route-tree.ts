import { usersMeQueryOptions } from "@/apis/query-options.ts";
import DefaultLayout from "@/layouts/default-layout";
import AboutPage from "@/pages/about-page";
import HomePage from "@/pages/home-page";
import { authRoutes } from "@/routes/auth/routes.ts";
import { divisionsRoutes } from "@/routes/league/divisions/routes";
import { gamesRoutes } from "@/routes/league/games/routes";
import { playersRoutes } from "@/routes/league/players/routes";
import { leagueRoutes } from "@/routes/league/routes";
import { seasonsRoutes } from "@/routes/league/seasons/routes";
import { teamsRoutes } from "@/routes/league/teams/routes";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { managerRoutes } from "@/routes/manager/routes.ts";
import type { AxiosError } from "axios";

async function usersMeLoader({ context }) {
  try {
    const user = await context.queryClient.ensureQueryData(usersMeQueryOptions);

    return {
      user: {
        loggedIn: true,
        ...user,
      },
    };
  }
  catch (error: AxiosError) {
    return {
      user: {
        loggedIn: false,
      },
    }
  }
}

export const rootRoute = createRootRoute({
  component: DefaultLayout,
  loader: usersMeLoader,
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
  ...divisionsRoutes,
  ...gamesRoutes,
  ...playersRoutes,
  ...seasonsRoutes,
  ...teamsRoutes,
]);
