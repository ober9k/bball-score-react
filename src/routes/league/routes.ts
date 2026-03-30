import LeaguePage from "@/pages/league/league-page";
import StandingsPage from "@/pages/league/standings-page";
import StatisticsPage from "@/pages/league/statistics-page";
import { mapRoute } from "@/routes/route.ts";

const paths = {
  "League":     "/league",
  "Standings":  "/league/standings",
  "Statistics": "/league/statistics",
};

const routes = [{
  path: paths.League,
  component: LeaguePage,
},{
  path: paths.Standings,
  component: StandingsPage,
},{
  path: paths.Statistics,
  component: StatisticsPage,
}];

export const leaguePaths = paths;
export const leagueRoutes = routes
  .map(mapRoute);
