import type { TeamStatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { StatisticsTable } from "@/components/statistics/statistics-table.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function StatisticsPage() {
  const { team, statisticsLogs }: TeamStatisticsLoaderProps = getRouteApi(leaguePaths.Teams.Statistics).useLoaderData();

  useTitle("Statistics");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Teams", to: leaguePaths.Teams.Index },
    { title: team.name + " Statistics" },
  ]);

  return (
    <>
      <StatisticsTable statisticsLogs={statisticsLogs} />
    </>
  );
}

export { StatisticsPage as TeamStatisticsPage };
