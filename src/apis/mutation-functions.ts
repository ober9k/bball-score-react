import { buildAuthApiPath, buildLeagueApiPath } from "@/apis/query-functions.ts";
import type { DivisionData } from "@/types/division.ts";
import type { LoginData } from "@/types/login.ts";
import type { TeamData } from "@/types/team.ts";
import axios from "axios";

export async function loginMutationFn(loginData: LoginData) {
  const { data } = await axios.post(buildAuthApiPath("login"), loginData);
  return data;
}

export async function divisionMutationFn(divisionData: DivisionData) {
  const { data } = await axios.put(buildLeagueApiPath("divisions", "1"), divisionData);
  return data;
}

export async function teamMutationFn(teamData: TeamData) {
  const { data } = await axios.put(buildLeagueApiPath("teams", "1"), teamData);
  return data;
}

type PathKey = "seasons" | "divisions" | "teams";

function buildBaseMutationFn(pathKey: PathKey, id?: number) {
  const apiUrl = (id && id > 0)
    ? buildLeagueApiPath(pathKey, id.toString())
    : buildLeagueApiPath(pathKey);

  return async function(seasonData) {
    const { data } = (id && id > 0)
      ? await axios.put(apiUrl, seasonData)
      : await axios.post(apiUrl, seasonData);

    return data;
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
