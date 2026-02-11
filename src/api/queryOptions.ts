import { homeQueryFn } from "./queryFunctions.ts";
import QueryKeys from "./queryKeys.ts";

export const homeQueryOptions = {
  queryKey: [QueryKeys.Home],
  queryFn: homeQueryFn,
};
