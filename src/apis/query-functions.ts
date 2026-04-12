import type { Game } from "@/types/game.ts";
import type { TeamLog } from "@/types/game/team-log.ts";
import axios from "axios";

/* TODO: add to config/env file instead */
const RootApiPath = "http://localhost/";
const RootApiPort = "8080";


/**
 * Build standardised URL for API usage.
 * @param parts
 */
function buildApiPath(...parts: Array<string>): string {
  const url =  new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", "v1", ...parts].join("/");

  return url.toString();
}

/**
 * Build standardised URL for league API usage.
 * @param parts
 */
export function buildLeagueApiPath(...parts: Array<string>): string {
  return buildApiPath("league", "1", ...parts);
}

/**
 * Build standardised URL for auth API usage.
 * @param parts
 */
export function buildAuthApiPath(...parts: Array<string>): string {
  return buildApiPath("auth", ...parts);
}

export async function divisionsQueryFn() {
  const { data } = await axios.get(buildLeagueApiPath("divisions"));
  return data;
}

export async function divisionQueryFn({ queryKey }) {
  const [ key, divisionId ] = queryKey;
  const { data } = await axios.get(buildLeagueApiPath("divisions", divisionId));
  return data;
}

export async function playersQueryFn() {
  const { data } = await axios.get(buildLeagueApiPath("players"));
  return data;
}

export async function playerQueryFn({ queryKey }) {
  const [ key, playerId ] = queryKey;
  const { data } = await axios.get(buildLeagueApiPath("players", playerId));
  return data;
}

export async function gamesQueryFn() {
  const { data: games } = await axios.get(buildLeagueApiPath("games"));

  /**
   * Minor restructuring until the API is tidied up more
   */
  return games.map((game: any) => ({
    id:    game.id,
    date:  game.date,
    phase: game.phase,
    round: game.round,
    teamLogs: game.gameTeams.map((gameTeam: any) => ({
      id:            gameTeam.id,
      side:          gameTeam.side,
      score:         gameTeam.score,
      scoreByPeriod: gameTeam.scoreByPeriod,
      team:          gameTeam.team,
    } as TeamLog)),
  } as Game));
}

export async function gameQueryFn({ queryKey }) {
  const [ key, gameId ] = queryKey;
  const { data } = await axios.get(buildLeagueApiPath("games", gameId));
  return data;
}

export async function seasonsQueryFn() {
  const { data } = await axios.get(buildLeagueApiPath("seasons"));
  return data;
}

export async function seasonQueryFn({ queryKey }) {
  const [ key, seasonId ] = queryKey;
  const { data } = await axios.get(buildLeagueApiPath("seasons", seasonId));
  return data;
}

export async function teamsQueryFn() {
  const { data } = await axios.get(buildLeagueApiPath("teams"));
  return data;
}

export async function teamQueryFn({ queryKey }) {
  const [ key, teamId ] = queryKey;
  const { data } = await axios.get(buildLeagueApiPath("teams", teamId));
  return data;
}

export async function logoutQueryFn() {
  const { data } = await axios.get(buildAuthApiPath("logout"));
  return data;
}

export async function usersMeQueryFn() {
  const { data } = await axios.get(buildAuthApiPath("me"));
  return data;
}
