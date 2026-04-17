import type { StatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function StatisticsPage() {
  const { statistics: statisticsLogs }: StatisticsLoaderProps = getRouteApi(leaguePaths.League.Statistics).useLoaderData();

  useTitle("Statistics");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Statistics" },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        TBD.
      </p>
    </>
  );
}

export { StatisticsPage as LeagueStatisticsPage };
