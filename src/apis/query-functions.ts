import type { DtoConverter } from "@/apis/converters.ts";
import type { StatisticsContext } from "@/apis/query-options.ts";
import type { Option } from "@/types/option.ts";
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
 * Generic function builder for fetching all items.
 * This will work off the linked query key and apply the provided converter.
 */
export function buildAllQueryFn<T>(converter: DtoConverter<T>) {
  return async function({ queryKey }): T[] {
    const { data } = await axios.get<any[]>(buildLeagueApiPath(...queryKey));
    return data.map(converter);
  };
}

/**
 * Generic function builder for fetching a single item by ID.
 * This will work off the linked query key and apply the provided converter.
 */
export function buildByIdQueryFn<T>(converter: DtoConverter<T>) {
  return async function({ queryKey }): T {
    const { data } = await axios.get<any>(buildLeagueApiPath(...queryKey));
    return converter(data);
  };
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

  return async function({ queryKey }) {
    const { data } = await axios.get(apiUrl);
    return data;
  }
}

export function buildStandingsQueryFn() {
  return buildBaseQueryFn("standings"); /* ++seasonId */
}

export function buildStatisticsQueryFn(statisticsContext: StatisticsContext) {
  return buildBaseQueryFn(`statistics/${statisticsContext}`); /* temporary workaround */ /* ++seasonId */
}

export async function logoutQueryFn() {
  const { data } = await axios.get(buildAuthApiPath("logout"));
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

/**
 * Function builder for getting options to display.
 * This is built off the query key contains a type and options.
 */
export function buildOptionsQueryFn() {
  return async function({ queryKey }): Option[] {
    const { data } = await axios.get(buildLeagueApiPath(...queryKey));
    return data;
  };
}
