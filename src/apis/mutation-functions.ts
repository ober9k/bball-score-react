import { buildAuthApiPath, buildLeagueApiPath } from "@/apis/query-functions.ts";
import type { LoginData } from "@/types/login.ts";
import type { TeamData } from "@/types/team.ts";
import axios from "axios";

export async function loginMutationFn(loginData: LoginData) {
  const { data } = await axios.post(buildAuthApiPath("login"), loginData);
  return data;
}

export function buildSeasonMutationFn(seasonId?: number) {
  const apiUrl = (!seasonId)
    ? buildLeagueApiPath("seasons")
    : buildLeagueApiPath("seasons", `${seasonId}`);

  return async function(seasonData) {
    const { data } = (!seasonId)
      ? await axios.post(apiUrl, seasonData)
      : await axios.put(apiUrl, seasonData);

    return data;
  }
}
