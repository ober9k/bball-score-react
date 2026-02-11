import { buildPlayerQueryOptions, buildTeamQueryOptions, homeQueryOptions, playersQueryOptions, teamsQueryOptions } from "../api/queryOptions.ts";
import { findGameById, findPlayerGameLogs, mockGames } from "../data/games.ts";
import type { TeamLog } from "../types/game/TeamLog.ts";
import type { StandingsRow } from "../types/row/StandingsRow.ts";
import type { Standings } from "../types/Standings.ts";
import type { Team } from "../types/Team.ts";
import { getAwayTeamLog, getHomeTeamLog } from "../utilities/GameUtils.ts";

export function homeLoader({ context: queryClient }) {
  /* todo: OOOOPSSS, messed up passing this through */
  return queryClient.queryClient.ensureQueryData(homeQueryOptions);
}

export function gamesLoader() {
  return {
    games: mockGames, /* temporary handling which will later ping an API */
  };
}

export function gameLoader({ params }) {
  const gameId = parseInt(params["gameId"]);

  if (isNaN(gameId)) {
    throw Error("Invalid `gameId` provided.");
  }

  const game = findGameById(gameId);

  if (game === undefined) {
    throw Error("Unable to find game with `gameId` provided.");
  }

  return {
    game: game,
  };
}

export function playersLoader({ context: queryClient }) {
  return queryClient.queryClient.ensureQueryData(playersQueryOptions);
}

export async function playerLoader({ context: queryClient, params }) {
  const playerId = +params["playerId"];

  const tempGame = mockGames[0];
  const { player } = await queryClient.queryClient.ensureQueryData(buildPlayerQueryOptions(playerId));
  const { team } = tempGame.teamLogs.filter((teamLog) => teamLog.playerLogs.filter((playerLog) => playerLog.playerId === playerId).length > 0).pop();
  const gameLogs = findPlayerGameLogs(playerId);

  return {
    player,
    team, /* TODO: handle data request properly */
    gameLogs, /* TODO: handle data request properly */
  };
}

export function standingsLoader() {
  const games = mockGames;
  const standings: Standings = {
    standingsRows: [],
  };

  let standingsRowId = 1;

  function getRow(team: Team): StandingsRow | undefined {
    return standings.standingsRows.find((standingsRow) => standingsRow.teamId === team.id);
  }

  function hasRow(team: Team): boolean {
    return getRow(team) !== undefined;
  }

  function createForTeam(team: Team): StandingsRow {
    return {
      id: standingsRowId++,
      teamId: team.id,
      team: team,
      wins: 0,
      losses: 0,
      draws: 0,
      byes: 0,
      pointsFor: 0,
      pointsAgainst: 0,
    };
  }

  function updateForTeam(teamLogA: TeamLog, teamLogB: TeamLog): void {
    // todo: refactor to something nicer
    if (!hasRow(teamLogA.team!)) {
      standings.standingsRows.push(
        createForTeam(teamLogA.team!)
      );
    }

    // todo: refactor to something nicer
    const teamRow = getRow(teamLogA.team!)!;
    teamRow.wins += (teamLogA.teamScore > teamLogB.teamScore) ? 1 : 0;
    teamRow.losses += (teamLogA.teamScore < teamLogB.teamScore) ? 1 : 0;
    teamRow.draws += (teamLogA.teamScore === teamLogB.teamScore) ? 1 : 0;
    teamRow.pointsFor += teamLogA.teamScore;
    teamRow.pointsAgainst += teamLogB.teamScore;
  }

  games.forEach((game) => {
    const awayTeamLog = getAwayTeamLog(game);
    const homeTeamLog = getHomeTeamLog(game);

    // todo: refactor to something nicer
    updateForTeam(awayTeamLog, homeTeamLog);
    updateForTeam(homeTeamLog, awayTeamLog);
  });

  return {
    standings,
  }
}

export function teamsLoader({ context: queryClient }) {
  return queryClient.queryClient.ensureQueryData(teamsQueryOptions);
}

export async function teamLoader({ context: queryClient, params }) {
  const teamId = +params["teamId"];
  return queryClient.queryClient.ensureQueryData(buildTeamQueryOptions(teamId));
}
