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
}, {
  path: paths.Team,
  component: TeamPage,
}];

export const teamsPaths = paths;
export const teamsRoutes = routes
    .map(mapRoute);
