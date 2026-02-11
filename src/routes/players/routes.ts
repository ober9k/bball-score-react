import { createRoute } from "@tanstack/react-router";
import IndexPage from "../../pages/players/IndexPage.tsx";
import ViewPage from "../../pages/players/ViewPage.tsx";
import { defaultOptions } from "../defaultOptions.ts";
import { playerLoader, playersLoader } from "../loaders.ts";
import { Paths } from "../paths.ts";
import { rootRoute } from "../rootRoute.ts";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Players,
  component: IndexPage,
  loader: playersLoader,
  ...defaultOptions,
});

const viewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Player,
  component: ViewPage,
  loader: playerLoader,
  ...defaultOptions,
});

export const playersRoutes = [
  indexRoute,
  viewRoute,
];
