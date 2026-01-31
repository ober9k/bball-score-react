import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import RootLayout from "../layouts/DefaultLayout.tsx";
import Games from "../pages/Games.tsx";
import Home from "../pages/Home.tsx";
import Players from "../pages/Players.tsx";
import Teams from "../pages/Teams.tsx";
import { Paths } from "./paths.ts";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Home,
  component: Home,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Games,
  component: Games,
});

const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Players,
  component: Players,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Teams,
  component: Teams,
});

const routeTree = rootRoute.addChildren([homeRoute, gamesRoute, playersRoute, teamsRoute]);

export const router = createRouter({ routeTree });


