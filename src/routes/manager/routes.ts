import { createRoute } from "@tanstack/react-router";
import IndexPage from "../../pages/manager/teams/IndexPage.tsx";
import UpdatePage from "../../pages/manager/teams/UpdatePage.tsx";
import { teamLoader, teamsLoader } from "../loaders.ts";
import { Paths } from "../paths.ts";
import { rootRoute } from "../rootRoute.ts";

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Manager.Teams,
  component: IndexPage,
  loader: teamsLoader,
});

const updateTeamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Manager.UpdateTeam,
  component: UpdatePage,
  loader: teamLoader,
});

export const managerRoutes = [
  teamsRoute,
  updateTeamRoute,
];
