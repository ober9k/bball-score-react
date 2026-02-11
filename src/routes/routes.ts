import { createRootRoute, createRoute } from "@tanstack/react-router";
import RootLayout from "../layouts/DefaultLayout.tsx";
import GamePage from "../pages/GamePage.tsx";
import GamesPage from "../pages/GamesPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import LoadingPage from "../pages/other/LoadingPage.tsx";
import PlayerPage from "../pages/PlayerPage.tsx";
import PlayersPage from "../pages/PlayersPage.tsx";
import StandingsPage from "../pages/StandingsPage.tsx";
import StatisticsPage from "../pages/StatisticsPage.tsx";
import TeamPage from "../pages/TeamPage.tsx";
import TeamsPage from "../pages/TeamsPage.tsx";
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
  component: HomePage,
  loader: homeLoader,
  ...defaultOptions,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Games,
  component: GamesPage,
  loader: gamesLoader,
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Game,
  component: GamePage,
  loader: gameLoader,
});

const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Players,
  component: PlayersPage,
  loader: playersLoader,
  ...defaultOptions,
});

const playerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Player,
  component: PlayerPage,
  loader: playerLoader,
  ...defaultOptions,
});

const standingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Standings,
  component: StandingsPage,
  loader: standingsLoader,
});

const statisticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Statistics,
  component: StatisticsPage,
});

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Teams,
  component: TeamsPage,
  loader: teamsLoader,
  ...defaultOptions,
});

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Team,
  component: TeamPage,
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
