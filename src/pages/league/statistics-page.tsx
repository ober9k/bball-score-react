import type { StatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { StatisticsTable } from "@/components/statistics/statistics-table.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function StatisticsPage() {
  const { statisticsLogs }: StatisticsLoaderProps = getRouteApi(leaguePaths.League.Statistics).useLoaderData();

  useTitle("Statistics");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Statistics" },
  ]);

  return (
    <>
      <StatisticsTable statisticsLogs={statisticsLogs} />
    </>
  );
}

export { StatisticsPage as LeagueStatisticsPage };
