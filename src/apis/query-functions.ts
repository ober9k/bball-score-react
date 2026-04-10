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
  url.pathname = ["api", "v1", "league", "1", ...parts].join("/");

  return url.toString();
}

/**
 * Build standardised URL for API usage.
 * @param parts
 */
export function buildUsersApiPath(...parts: Array<string>): string {
  const url =  new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", "v1", "users", ...parts].join("/");

  return url.toString();
}

export async function divisionsQueryFn() {
  const { data } = await axios.get(buildApiPath("divisions"));
  return data;
}

export async function divisionQueryFn({ queryKey }) {
  const [ key, divisionId ] = queryKey;
  const { data } = await axios.get(buildApiPath("divisions", divisionId));
  return data;
}

export async function playersQueryFn() {
  const { data } = await axios.get(buildApiPath("players"));
  return data;
}

export async function playerQueryFn({ queryKey }) {
  const [ key, playerId ] = queryKey;
  const { data } = await axios.get(buildApiPath("players", playerId));
  return data;
}

export async function seasonsQueryFn() {
  const { data } = await axios.get(buildApiPath("seasons"));
  return data;
}

export async function seasonQueryFn({ queryKey }) {
  const [ key, seasonId ] = queryKey;
  const { data } = await axios.get(buildApiPath("seasons", seasonId));
  return data;
}

export async function teamsQueryFn() {
  const { data } = await axios.get(buildApiPath("teams"));
  return data;
}

export async function teamQueryFn({ queryKey }) {
  const [ key, teamId ] = queryKey;
  const { data } = await axios.get(buildApiPath("teams", teamId));
  return data;
}

export async function usersMeQueryFn() {
  const { data } = await axios.get(buildUsersApiPath("me"), {
    withCredentials: true,
  });
  return data;
}
