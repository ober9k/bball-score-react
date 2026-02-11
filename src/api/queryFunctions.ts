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
  url.pathname = ["api", ...parts].join("/");

  return url.toString();
}

export function homeQueryFn() {
  return axios
    .get<Array<string>>(buildApiPath("home"))
    .then(res => res.data);
}

export function playersQueryFn() {
  return axios
    .get<Array<string>>(buildApiPath("players"))
    .then(res => res.data);
}

export function playerQueryFn({ queryKey }) {
  const [ , playerId ] = queryKey;

  return axios
    .get<Array<string>>(buildApiPath("players", playerId))
    .then(res => res.data);
}

export function teamsQueryFn() {
  return axios
    .get<Array<string>>(buildApiPath("teams"))
    .then(res => res.data);
}

export function teamQueryFn({ queryKey }) {
  const [ , teamId ] = queryKey;

  return axios
    .get<Array<string>>(buildApiPath("teams", teamId))
    .then(res => res.data);
}
