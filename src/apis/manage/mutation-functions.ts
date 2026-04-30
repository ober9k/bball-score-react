import { buildLeagueApiUrl } from "@/lib/urls.ts";
import axios from "axios";

type PathKey = "seasons" | "divisions" | "teams" | "players" | "games";

function buildBaseMutationFn(pathKey: PathKey, id?: number) {
  const apiUrl = (id && id > 0)
    ? buildLeagueApiUrl("manage", pathKey, id.toString())
    : buildLeagueApiUrl("manage", pathKey);

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

export function buildGamesMutationFn(id?: number) {
  return buildBaseMutationFn("games", id);
}
