import { divisionLoader, divisionsLoader, gameLoader, gamesLoader, playerLoader, playersLoader, seasonLoader, seasonsLoader, teamLoader, teamsLoader } from "@/apis/loaders.ts";
import DivisionPage from "@/pages/league/divisions/division-page.tsx";
import DivisionsPage from "@/pages/league/divisions/divisions-page.tsx";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import GamePage from "@/pages/league/games/game-page.tsx";
import GamesPage from "@/pages/league/games/games-page.tsx";
import LeaguePage from "@/pages/league/league-page";
import PlayerPage from "@/pages/league/players/player-page.tsx";
import PlayersPage from "@/pages/league/players/players-page.tsx";
import SeasonPage from "@/pages/league/seasons/season-page.tsx";
import SeasonsPage from "@/pages/league/seasons/seasons-page.tsx";
import StandingsPage from "@/pages/league/standings-page";
import StatisticsPage from "@/pages/league/statistics-page";
import TeamPage from "@/pages/league/teams/team-page.tsx";
import TeamsPage from "@/pages/league/teams/teams-page.tsx";
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
  component: LeaguePage,
},{
  path: paths.Standings,
  component: StandingsPage,
},{
  path: paths.Statistics,
  component: StatisticsPage,
},{
  path: paths.Seasons.Index,
  component: SeasonsPage,
  loader: seasonsLoader,
},{
  path: paths.Seasons.View,
  component: SeasonPage,
  notFoundComponent: NotFoundPage,
  loader: seasonLoader,
},{
  path: paths.Divisions.Index,
  component: DivisionsPage,
  loader: divisionsLoader,
},{
  path: paths.Divisions.View,
  component: DivisionPage,
  notFoundComponent: NotFoundPage,
  loader: divisionLoader,
},{
  path: paths.Teams.Index,
  component: TeamsPage,
  loader: teamsLoader,
},{
  path: paths.Teams.View,
  component: TeamPage,
  notFoundComponent: NotFoundPage,
  loader: teamLoader,
},{
  path: paths.Players.Index,
  component: PlayersPage,
  loader: playersLoader,
},{
  path: paths.Players.View,
  component: PlayerPage,
  notFoundComponent: NotFoundPage,
  loader: playerLoader,
},{
  path: paths.Games.Index,
  component: GamesPage,
  loader: gamesLoader,
}, {
  path: paths.Games.View,
  component: GamePage,
  notFoundComponent: NotFoundPage,
  loader: gameLoader,
}];

export const leaguePaths = paths;
export const leagueRoutes = routes
  .map(mapRoute);
