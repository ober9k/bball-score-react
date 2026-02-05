import { findGameById, mockGames } from "../data/games.ts";
import { findPlayerById, mockPlayers } from "../data/players.ts";
import { findTeamById, mockTeams } from "../data/teams.ts";
import type { TeamLog } from "../types/game/TeamLog.ts";
import type { StandingsRow } from "../types/row/StandingsRow.ts";
import type { Standings } from "../types/Standings.ts";
import type { Team } from "../types/Team.ts";
import { getAwayTeamLog, getHomeTeamLog } from "../utilities/GameUtils.ts";

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

export function playersLoader() {
  return {
    players: mockPlayers, /* temporary handling which will later ping an API */
  };
}

export function playerLoader({ params }) {
  const playerId = parseInt(params["playerId"]);

  if (isNaN(playerId)) {
    throw Error("Invalid `playerId` provided.");
  }

  const player = findPlayerById(playerId);

  if (player === undefined) {
    throw Error("Unable to find game with `playerId` provided.");
  }

  /* temporary: just search some game logs for a `teamId` */
  const tempGame = mockGames[0];
  const { team } = tempGame.teamLogs.filter((teamLog) => teamLog.playerLogs.filter((playerLog) => playerLog.playerId === playerId).length > 0).pop();

  if (team === undefined) {
    throw Error("Unable to find team with `playerId` provided.");
  }

  return {
    player: player,
    playerGames: [],
    team: team,
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

export function teamsLoader() {
  return {
    teams: mockTeams, /* temporary handling which will later ping an API */
  };
}

export function teamLoader({ params }) {
  const teamId = parseInt(params["teamId"]);

  if (isNaN(teamId)) {
    throw Error("Invalid `teamId` provided.");
  }

  const team = findTeamById(teamId);

  if (team === undefined) {
    throw Error("Unable to find game with `teamId` provided.");
  }

  return {
    team: team,
  };
}
