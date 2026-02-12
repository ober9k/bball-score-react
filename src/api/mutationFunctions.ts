import axios from "axios";
import type { TeamData } from "../data/actions.ts";

/**
 * TODO: add to config/env file instead
 * TODO: duplicated, to update after
 */
const RootApiPath = "http://localhost/";
const RootApiPort = "8080";

/**
 * Build standardised URL for API usage.
 * TODO: duplicated, to update after
 * @param parts
 */
function buildApiPath(...parts: Array<string>): string {
  const url =  new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", ...parts].join("/");

  return url.toString();
}

export function teamMutationFn(teamData: TeamData) {
  const { id: teamId } = teamData;

  return axios
    .put<Array<string>>(buildApiPath("teams", `${teamId}`), teamData)
    .then(res => res.data);
}
