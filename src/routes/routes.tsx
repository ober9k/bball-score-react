import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "../App.tsx";
import RootLayout from "../layouts/DefaultLayout.tsx";
import Games from "../pages/Games.tsx";
import Players from "../pages/Players.tsx";
import Teams from "../pages/Teams.tsx";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/games',
  component: Games,
});

const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/players',
  component: Players,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teams',
  component: Teams,
});

const routeTree = rootRoute.addChildren([homeRoute, gamesRoute, playersRoute, teamsRoute]);

export const router = createRouter({ routeTree });


