import { teamLoader, teamsLoader } from "@/apis/loaders.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import TeamPage from "@/pages/league/teams/team-page";
import TeamsPage from "@/pages/league/teams/teams-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

const paths = {
  Teams: "/league/teams",
  Team:  "/league/teams/$teamId",
};

const routes: Route[] = [{
  path: paths.Teams,
  component: TeamsPage,
  loader: teamsLoader,
},{
  path: paths.Team,
  component: TeamPage,
  notFoundComponent: NotFoundPage,
  loader: teamLoader,
}];

export const teamsPaths = paths;
export const teamsRoutes = routes
    .map(mapRoute);
