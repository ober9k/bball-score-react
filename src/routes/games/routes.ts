import { createRoute } from "@tanstack/react-router";
import IndexPage from "../../pages/games/IndexPage.tsx";
import ViewPage from "../../pages/games/ViewPage.tsx";
import { gameLoader, gamesLoader } from "../loaders.ts";
import { Paths } from "../paths.ts";
import { rootRoute } from "../rootRoute.ts";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Games,
  component: IndexPage,
  loader: gamesLoader,
});

const viewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Game,
  component: ViewPage,
  loader: gameLoader,
});

export const gamesRoutes = [
  indexRoute,
  viewRoute,
];
