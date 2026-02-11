import { homeQueryFn, playersQueryFn, teamsQueryFn } from "./queryFunctions.ts";
import QueryKeys from "./queryKeys.ts";

export const homeQueryOptions = {
  queryKey: [QueryKeys.Home],
  queryFn: homeQueryFn,
};

export const playersQueryOptions = {
  queryKey: [QueryKeys.Players],
  queryFn: playersQueryFn,
};

export const teamsQueryOptions = {
  queryKey: [QueryKeys.Teams],
  queryFn: teamsQueryFn,
};
