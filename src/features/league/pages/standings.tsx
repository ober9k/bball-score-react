import type { StandingsLoaderProps } from "@/apis/loaders/types";
import { StandingsTable } from "@/components/standings/standings-table";
import { useBreadcrumbs, useTitle } from "@/hooks/page";
import { sortByPoints } from "@/lib/standings-utils";
import { leaguePaths } from "@/routes/league/routes";
import { getRouteApi } from "@tanstack/react-router";

export function Standings() {
  const { standingsLogs }: StandingsLoaderProps = getRouteApi(leaguePaths.League.Standings).useLoaderData();

  useTitle("Standings");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Standings" },
  ]);

  const sortedStandingsLogs = standingsLogs.sort(sortByPoints);

  return (
    <>
      <StandingsTable standingsLogs={sortedStandingsLogs} />
    </>
  );
}

export default Standings;
