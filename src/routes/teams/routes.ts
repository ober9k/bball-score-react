import { createRoute } from "@tanstack/react-router";
import IndexPage from "../../pages/teams/IndexPage.tsx";
import ViewPage from "../../pages/teams/ViewPage.tsx";
import { defaultOptions } from "../defaultOptions.ts";
import { teamLoader, teamsLoader } from "../loaders.ts";
import { Paths } from "../paths.ts";
import { rootRoute } from "../routes.ts";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Teams,
  component: IndexPage,
  loader: teamsLoader,
  ...defaultOptions,
});

const viewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Team,
  component: ViewPage,
  loader: teamLoader,
  ...defaultOptions,
});

export const teamsRoutes = [
  indexRoute,
  viewRoute,
];
