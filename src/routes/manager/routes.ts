import { createRoute } from "@tanstack/react-router";
import Teams from "../../pages/manager/Teams.tsx";
import UpdateTeam from "../../pages/manager/teams/UpdateTeam.tsx";
import { teamLoader, teamsLoader } from "../loaders.ts";
import { Paths } from "../paths.ts";
import { rootRoute } from "../routes.ts";

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Manager.Teams,
  component: Teams,
  loader: teamsLoader,
});

const updateTeamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Manager.UpdateTeam,
  component: UpdateTeam,
  loader: teamLoader,
});

export const managerRoutes = [
  teamsRoute,
  updateTeamRoute,
];
