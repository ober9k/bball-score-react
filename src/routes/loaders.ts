import { findGameById, mockGames } from "../data/games.ts";
import { findPlayerById, mockPlayers } from "../data/players.ts";
import { findTeamById, mockTeams } from "../data/teams.ts";
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

  games.forEach((game) => {
    const awayTeamLog = getAwayTeamLog(game);
    const homeTeamLog = getHomeTeamLog(game);

    // todo: refactor to something nicer
    if (!hasRow(awayTeamLog.team!)) {
      standings.standingsRows.push(
        createForTeam(awayTeamLog.team!)
      );
    }

    // todo: refactor to something nicer
    const awayTeamRow = getRow(awayTeamLog.team!)!;
    awayTeamRow.wins += (awayTeamLog.teamScore > homeTeamLog.teamScore) ? 1 : 0;
    awayTeamRow.losses += (awayTeamLog.teamScore < homeTeamLog.teamScore) ? 1 : 0;
    awayTeamRow.draws += (awayTeamLog.teamScore === homeTeamLog.teamScore) ? 1 : 0;
    awayTeamRow.pointsFor += awayTeamLog.teamScore;
    awayTeamRow.pointsAgainst += homeTeamLog.teamScore;

    // todo: refactor to something nicer
    if (!hasRow(homeTeamLog.team!)) {
      standings.standingsRows.push(
        createForTeam(homeTeamLog.team!)
      );
    }

    // todo: refactor to something nicer
    const homeTeamRow = getRow(homeTeamLog.team!)!;
    homeTeamRow.wins += (homeTeamLog.teamScore > awayTeamLog.teamScore) ? 1 : 0;
    homeTeamRow.losses += (homeTeamLog.teamScore < awayTeamLog.teamScore) ? 1 : 0;
    homeTeamRow.draws += (homeTeamLog.teamScore === awayTeamLog.teamScore) ? 1 : 0;
    homeTeamRow.pointsFor += homeTeamLog.teamScore;
    homeTeamRow.pointsAgainst += awayTeamLog.teamScore;
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
