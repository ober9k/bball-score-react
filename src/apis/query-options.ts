import { divisionQueryFn, divisionsQueryFn } from "@/apis/query-functions";
import { queryKeys } from "@/apis/query-keys";

export const divisionsQueryOptions = {
  queryKey: [queryKeys.Divisions],
  queryFn: divisionsQueryFn,
};

export function buildDivisionQueryOptions(divisionId: number) {
  return {
    queryKey: [queryKeys.Division, divisionId],
    queryFn: divisionQueryFn,
  }
}
