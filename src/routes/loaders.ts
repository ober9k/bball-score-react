import { findGameById, mockGames } from "../data/games.ts";
import { mockPlayers } from "../data/players.ts";
import { mockTeams } from "../data/teams.ts";

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

export function teamsLoader() {
  return {
    teams: mockTeams, /* temporary handling which will later ping an API */
  };
}
