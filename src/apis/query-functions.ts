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

type PathKey = "seasons" | "divisions" | "teams" | "players";

function buildBaseQueryFn(pathKey: PathKey, id?: number) {
  const apiUrl = (id && id > 0)
    ? buildLeagueApiPath(pathKey, id.toString())
    : buildLeagueApiPath(pathKey);

  return async function() {
    const { data } = await axios.get(apiUrl);
    return data;
  }
}

export function buildSeasonsQueryFn(id?: number) {
  return buildBaseQueryFn("seasons", id);
}

export function buildDivisionsQueryFn(id?: number) {
  return buildBaseQueryFn("divisions", id);
}

export function buildTeamsQueryFn(id?: number) {
  return buildBaseQueryFn("teams", id);
}

export function buildPlayersQueryFn(id?: number) {
  return buildBaseQueryFn("players", id);
}

export function buildGamesQueryFn(id?: number) {
  return buildBaseQueryFn("games", id);
}

export async function logoutQueryFn() {
  const { data } = await axios.get(buildAuthApiPath("logout"));
  return data;
}

export async function usersMeQueryFn() {
  const { data } = await axios.get(buildAuthApiPath("me"));
  return data;
}

export async function authUserQueryFn() {
  try {
    const { data: user } = await axios.get(buildAuthApiPath("me"));
    return user;
  }
  catch (error) {
    return null;
  }
}
