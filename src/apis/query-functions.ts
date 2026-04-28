import type { DtoConverter } from "@/apis/converters.ts";
import type { StatisticsMode } from "@/apis/query-options.ts";
import { buildAuthApiUrl, buildLeagueApiUrl } from "@/lib/urls.ts";
import type { Option } from "@/types/option.ts";
import axios from "axios";

/**
 * Generic function builder for fetching all items.
 * This will work off the linked query key and apply the provided converter.
 */
export function buildAllQueryFn<T>(converter: DtoConverter<T>) {
  return async function({ queryKey }): Promise<T[]> {
    const { data } = await axios.get<any[]>(buildLeagueApiUrl(...queryKey));
    return data.map(converter);
  };
}

/**
 * Generic function builder for fetching a single item by ID.
 * This will work off the linked query key and apply the provided converter.
 */
export function buildByIdQueryFn<T>(converter: DtoConverter<T>) {
  return async function({ queryKey }): Promise<T> {
    const { data } = await axios.get<any>(buildLeagueApiUrl(...queryKey));
    return converter(data);
  };
}

type PathKey = "seasons" | "divisions" | "teams" | "players";

function buildBaseQueryFn(pathKey: PathKey, id?: number) {
  const apiUrl = (id && id > 0)
    ? buildLeagueApiUrl(pathKey, id.toString())
    : buildLeagueApiUrl(pathKey);

  return async function({ queryKey }) {
    const { data } = await axios.get(apiUrl);
    return data;
  }
}

export function buildStandingsQueryFn() {
  return buildBaseQueryFn("standings"); /* ++seasonId */
}

export async function logoutQueryFn() {
  const { data } = await axios.get(buildAuthApiUrl("logout"));
  return data;
}

export async function authUserQueryFn() {
  try {
    const { data: user } = await axios.get(buildAuthApiUrl("me"));
    return user;
  }
  catch (error) {
    return null;
  }
}

/**
 * Function builder for getting options to display.
 * This is built off the query key contains a type and options.
 */
export function buildOptionsQueryFn() {
  return async function({ queryKey }): Promise<Option[]> {
    const { data } = await axios.get(buildLeagueApiUrl(...queryKey));
    return data;
  };
}
