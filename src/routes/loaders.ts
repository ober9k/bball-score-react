import { findGameById, mockGames } from "../data/games.ts";
import { findPlayerById, mockPlayers } from "../data/players.ts";
import { findTeamById, mockTeams } from "../data/teams.ts";

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
