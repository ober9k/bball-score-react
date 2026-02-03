import { createRootRoute, createRoute } from "@tanstack/react-router";
import RootLayout from "../layouts/DefaultLayout.tsx";
import Game from "../pages/Game.tsx";
import Games from "../pages/Games.tsx";
import Home from "../pages/Home.tsx";
import Players from "../pages/Players.tsx";
import Teams from "../pages/Teams.tsx";
import { gameLoader, gamesLoader, playersLoader, teamsLoader } from "./loaders.ts";
import { Paths } from "./paths.ts";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Home,
  component: Home,
  loader: () => [],
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Games,
  component: Games,
  loader: gamesLoader,
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Game,
  component: Game,
  loader: gameLoader,
});

const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Players,
  component: Players,
  loader: playersLoader,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Teams,
  component: Teams,
  loader: teamsLoader,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  gamesRoute,
  gameRoute,
  playersRoute,
  teamsRoute,
]);
