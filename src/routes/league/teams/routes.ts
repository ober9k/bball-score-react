import { buildTeamQueryOptions, teamsQueryOptions } from "@/apis/query-options.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import TeamPage from "@/pages/league/teams/team-page";
import TeamsPage from "@/pages/league/teams/teams-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";
import type { AxiosError } from "axios";

export async function teamsLoader({ context }) {
  return {
    teams: await context.queryClient.fetchQuery(teamsQueryOptions)
  };
}

export async function teamLoader({ context, params }) {
  const teamId = +params["teamId"];

  try {
    return {
      team: await context.queryClient.fetchQuery(buildTeamQueryOptions(teamId))
    };
  }
  catch (error: AxiosError) {
    throw new Error(error.message);
  }
}

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
  errorComponent: NotFoundPage,
  loader: teamLoader,
}];

export const teamsPaths = paths;
export const teamsRoutes = routes
    .map(mapRoute);
