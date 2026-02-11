import { createRootRoute, createRoute } from "@tanstack/react-router";
import RootLayout from "../layouts/DefaultLayout.tsx";
import Game from "../pages/Game.tsx";
import Games from "../pages/Games.tsx";
import Home from "../pages/Home.tsx";
import LoadingPage from "../pages/other/LoadingPage.tsx";
import Player from "../pages/Player.tsx";
import Players from "../pages/Players.tsx";
import Standings from "../pages/Standings.tsx";
import Statistics from "../pages/Statistics.tsx";
import Team from "../pages/Team.tsx";
import Teams from "../pages/Teams.tsx";
import { gameLoader, gamesLoader, homeLoader, playerLoader, playersLoader, standingsLoader, teamLoader, teamsLoader } from "./loaders.ts";
import { managerRoutes } from "./manager/routes.ts";
import { Paths } from "./paths.ts";

const defaultOptions = {
  pendingMs: 100, /* let the loader show (almost) straight away */
  pendingComponent: LoadingPage,
};

export const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Home,
  component: Home,
  loader: homeLoader,
  ...defaultOptions,
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
  ...defaultOptions,
});

const playerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Player,
  component: Player,
  loader: playerLoader,
  ...defaultOptions,
});

const standingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Standings,
  component: Standings,
  loader: standingsLoader,
});

const statisticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Statistics,
  component: Statistics,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Teams,
  component: Teams,
  loader: teamsLoader,
  ...defaultOptions,
});

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Team,
  component: Team,
  loader: teamLoader,
  ...defaultOptions,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  gamesRoute,
  gameRoute,
  playersRoute,
  playerRoute,
  standingsRoute,
  statisticsRoute,
  teamsRoute,
  teamRoute,
  ...managerRoutes,
]);
