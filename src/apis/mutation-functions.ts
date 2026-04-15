import { buildAuthApiPath, buildLeagueApiPath } from "@/apis/query-functions.ts";
import type { LoginData } from "@/types/login.ts";
import axios from "axios";

export async function loginMutationFn(loginData: LoginData) {
  const { data } = await axios.post(buildAuthApiPath("login"), loginData);
  return data;
}

type PathKey = "seasons" | "divisions" | "teams" | "players";

function buildBaseMutationFn(pathKey: PathKey, id?: number) {
  const apiUrl = (id && id > 0)
    ? buildLeagueApiPath(pathKey, id.toString())
    : buildLeagueApiPath(pathKey);

  return async function(data) { /* this can maybe use a generic */
    const result = (id && id > 0)
      ? await axios.put(apiUrl, data)
      : await axios.post(apiUrl, data);

    return result.data;
  }
}

export function buildSeasonsMutationFn(id?: number) {
  return buildBaseMutationFn("seasons", id);
}

export function buildDivisionsMutationFn(id?: number) {
  return buildBaseMutationFn("divisions", id);
}

export function buildTeamsMutationFn(id?: number) {
  return buildBaseMutationFn("teams", id);
}

export function buildPlayersMutationFn(id?: number) {
  return buildBaseMutationFn("players", id);
}
