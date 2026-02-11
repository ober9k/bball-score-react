import { createRoute } from "@tanstack/react-router";
import TeamsPage from "../../pages/manager/TeamsPage.tsx";
import UpdateTeamPage from "../../pages/manager/teams/UpdateTeamPage.tsx";
import { teamLoader, teamsLoader } from "../loaders.ts";
import { Paths } from "../paths.ts";
import { rootRoute } from "../routes.ts";

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Manager.Teams,
  component: TeamsPage,
  loader: teamsLoader,
});

const updateTeamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Manager.UpdateTeam,
  component: UpdateTeamPage,
  loader: teamLoader,
});

export const managerRoutes = [
  teamsRoute,
  updateTeamRoute,
];
