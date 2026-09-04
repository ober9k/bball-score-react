import type { StandingsLoaderProps } from "@/apis/loaders/types";
import { StandingsTable } from "@/components/standings/standings-table";
import { useBreadcrumbs, useTitle } from "@/hooks/page";
import { calculatePoints } from "@/lib/standings-utils";
import { leaguePaths } from "@/routes/league/routes";
import type { StandingsLog } from "@/types/standings-log";
import { getRouteApi } from "@tanstack/react-router";

export function Standings() {
  const { standingsLogs }: StandingsLoaderProps = getRouteApi(leaguePaths.League.Standings).useLoaderData();

  useTitle("Standings");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Standings" },
  ]);

  const sortedStandingsLogs = standingsLogs.sort((logA: StandingsLog, logB: StandingsLog) => {
    const pointsA = calculatePoints(logA);
    const pointsB = calculatePoints(logB);

    /* raw initial sort by points */
    if (pointsA < pointsB) return  1;
    if (pointsA > pointsB) return -1;

    /* secondary sort by points difference */
    return (logB.pointsFor - logB.pointsAgainst) - (logA.pointsFor - logA.pointsAgainst);
  });

  return (
    <>
      <StandingsTable standingsLogs={sortedStandingsLogs} />
    </>
  );
}

export default Standings;
