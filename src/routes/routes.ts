import { createRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage.tsx";
import StandingsPage from "../pages/StandingsPage.tsx";
import StatisticsPage from "../pages/StatisticsPage.tsx";
import { defaultOptions } from "./defaultOptions.ts";
import { gamesRoutes } from "./games/routes.ts";
import { homeLoader, standingsLoader, statisticsLoader } from "./loaders.ts";
import { managerRoutes } from "./manager/routes.ts";
import { Paths } from "./paths.ts";
import { playersRoutes } from "./players/routes.ts";
import { rootRoute } from "./rootRoute.ts";
import { teamsRoutes } from "./teams/routes.ts";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Home,
  component: HomePage,
  loader: homeLoader,
  ...defaultOptions,
});

const standingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Standings,
  component: StandingsPage,
  loader: standingsLoader,
  ...defaultOptions,
});

const statisticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Statistics,
  component: StatisticsPage,
  loader: statisticsLoader,
  ...defaultOptions,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  standingsRoute,
  statisticsRoute,
  ...gamesRoutes,
  ...managerRoutes,
  ...teamsRoutes,
  ...playersRoutes,
]);
