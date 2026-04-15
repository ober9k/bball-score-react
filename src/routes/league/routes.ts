import { divisionLoader, divisionsLoader, gameLoader, gamesLoader, playerLoader, playersLoader, seasonLoader, seasonsLoader, teamLoader, teamsLoader } from "@/apis/loaders.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import {
  DivisionsIndexPage,
  DivisionsViewPage,
  GamesIndexPage,
  GamesViewPage,
  LeagueIndexPage,
  LeagueStandingsPage,
  LeagueStatisticsPage,
  PlayersIndexPage,
  PlayersViewPage,
  SeasonsIndexPage,
  SeasonsViewPage,
  TeamsIndexPage,
  TeamsViewPage
} from "@/routes/league/pages.ts";
import { mapRoute } from "@/routes/route.ts";

const paths = {
  League:     "/league",
  Standings:  "/league/standings",
  Statistics: "/league/statistics",
  Seasons: {
    Index:  "/league/seasons",
    View:   "/league/seasons/$seasonId/view",
  },
  Divisions: {
    Index:  "/league/divisions",
    View:   "/league/divisions/$divisionId/view",
  },
  Teams: {
    Index:  "/league/teams",
    View:   "/league/teams/$teamId/view",
  },
  Players: {
    Index:  "/league/players",
    View:   "/league/players/$playerId/view",
  },
  Games: {
    Index:  "/league/games",
    View:   "/league/games/$gameId/view",
  },
};

const routes = [{
  path: paths.League,
  component: LeagueIndexPage,
},{
  path: paths.Standings,
  component: LeagueStandingsPage,
},{
  path: paths.Statistics,
  component: LeagueStatisticsPage,
},{
  path: paths.Seasons.Index,
  component: SeasonsIndexPage,
  loader: seasonsLoader,
},{
  path: paths.Seasons.View,
  component: SeasonsViewPage,
  notFoundComponent: NotFoundPage,
  loader: seasonLoader,
},{
  path: paths.Divisions.Index,
  component: DivisionsIndexPage,
  loader: divisionsLoader,
},{
  path: paths.Divisions.View,
  component: DivisionsViewPage,
  notFoundComponent: NotFoundPage,
  loader: divisionLoader,
},{
  path: paths.Teams.Index,
  component: TeamsIndexPage,
  loader: teamsLoader,
},{
  path: paths.Teams.View,
  component: TeamsViewPage,
  notFoundComponent: NotFoundPage,
  loader: teamLoader,
},{
  path: paths.Players.Index,
  component: PlayersIndexPage,
  loader: playersLoader,
},{
  path: paths.Players.View,
  component: PlayersViewPage,
  notFoundComponent: NotFoundPage,
  loader: playerLoader,
},{
  path: paths.Games.Index,
  component: GamesIndexPage,
  loader: gamesLoader,
}, {
  path: paths.Games.View,
  component: GamesViewPage,
  notFoundComponent: NotFoundPage,
  loader: gameLoader,
}];

export const leaguePaths = paths;
export const leagueRoutes = routes
  .map(mapRoute);
