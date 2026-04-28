import type { StandingsLoaderProps } from "@/apis/loaders/types.ts";
import { StandingsTable } from "@/components/standings/standings-table.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { formatPoints } from "@/lib/standings-utils.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { StandingsLog } from "@/types/standings-log.ts";
import { getRouteApi } from "@tanstack/react-router";

export function StandingsPage() {
  const { standingsLogs }: StandingsLoaderProps = getRouteApi(leaguePaths.League.Standings).useLoaderData();

  useTitle("Standings");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Standings" },
  ]);

  const sortedStandingsLogs = standingsLogs.sort((logA: StandingsLog, logB: StandingsLog) => {
    const pointsA = formatPoints(logA.wins, logA.losses, logA.draws, logA.byes);
    const pointsB = formatPoints(logB.wins, logB.losses, logB.draws, logB.byes);

    if (pointsA < pointsB) return  1;
    if (pointsA > pointsB) return -1;
    return 0;
  });

  return (
    <>
      <StandingsTable standingsLogs={sortedStandingsLogs} />
    </>
  );
}

export { StandingsPage as LeagueStandingsPage };
