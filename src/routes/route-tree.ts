import DefaultLayout from "@/layouts/default-layout";
import AboutPage from "@/pages/about-page";
import HomePage from "@/pages/home-page";
import { divisionsRoutes } from "@/routes/league/divisions/routes";
import { gamesRoutes } from "@/routes/league/games/routes";
import { playersRoutes } from "@/routes/league/players/routes";
import { leagueRoutes } from "@/routes/league/routes";
import { seasonsRoutes } from "@/routes/league/seasons/routes";
import { teamsRoutes } from "@/routes/league/teams/routes";
import { createRootRoute, createRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: DefaultLayout,
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
  ...leagueRoutes,
  ...divisionsRoutes,
  ...gamesRoutes,
  ...playersRoutes,
  ...seasonsRoutes,
  ...teamsRoutes,
]);
