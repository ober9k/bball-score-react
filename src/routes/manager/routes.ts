import { createRoute } from "@tanstack/react-router";
import Teams from "../../pages/manager/Teams.tsx";
import { teamsLoader } from "../loaders.ts";
import { Paths } from "../paths.ts";
import { rootRoute } from "../routes.ts";

const teamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Paths.Manager.Teams,
  component: Teams,
  loader: teamsLoader,
});

export const managerRoutes = [
  teamsRoute,
];
