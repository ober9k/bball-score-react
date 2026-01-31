import { mockGames } from "../data/Games.ts";
import { mockPlayers } from "../data/Players.ts";
import { mockTeams } from "../data/Teams.ts";

export function gamesLoader() {
  return {
    games: mockGames, /* temporary handling which will later ping an API */
  }
}

export function playersLoader() {
  return {
    players: mockPlayers, /* temporary handling which will later ping an API */
  }
}

export function teamsLoader() {
  return {
    teams: mockTeams, /* temporary handling which will later ping an API */
  }
}
