import {
  divisionLoader,
  divisionsLoader,
  gameLoader,
  gamesLoader,
  playerLoader,
  playersLoader,
  seasonLoader,
  seasonsLoader,
  standingsLoader,
  statisticsLoader,
  teamLoader,
  teamPlayersLoader,
  teamsLoader,
  teamStatisticsLoader
} from "@/apis/loaders.ts";
import NotFoundPage from "@/pages/errors/not-found-page.tsx";
import { TeamsPlayersPage } from "@/pages/league/teams/players-page.tsx";
import { TeamStatisticsPage } from "@/pages/league/teams/statistics-page.tsx";
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
  League: {
    Index:      "/league",
    Standings:  "/league/standings",
    Statistics: "/league/statistics",
  },
  Seasons: {
    Index:  "/league/seasons",
    View:   "/league/seasons/$seasonId/view",
  },
  Divisions: {
    Index:  "/league/divisions",
    View:   "/league/divisions/$divisionId/view",
  },
  Teams: {
    Index:      "/league/teams",
    View:       "/league/teams/$teamId/view",
    Players   : "/league/teams/$teamId/players",
    Statistics: "/league/teams/$teamId/statistics",
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
  path: paths.League.Index,
  component: LeagueIndexPage,
},{
  path: paths.League.Standings,
  loader: standingsLoader,
  component: LeagueStandingsPage,
},{
  path: paths.League.Statistics,
  component: LeagueStatisticsPage,
  loader: statisticsLoader,
  loaderDeps: ({ search: { mode } }) => ({ mode }),
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
  path: paths.Teams.Players,
  component: TeamsPlayersPage,
  notFoundComponent: NotFoundPage,
  loader: teamPlayersLoader,
},{
  path: paths.Teams.Statistics,
  component: TeamStatisticsPage,
  notFoundComponent: NotFoundPage,
  loader: teamStatisticsLoader,
  loaderDeps: ({ search: { mode } }) => ({ mode }),
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
