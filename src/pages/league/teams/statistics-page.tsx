import type { TeamStatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { StatisticsTable } from "@/components/statistics/statistics-table.tsx";
import { TeamMenu } from "@/components/teams/team-menu.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function StatisticsPage() {
  const { team, statisticsLogs }: TeamStatisticsLoaderProps = getRouteApi(leaguePaths.Teams.Statistics).useLoaderData();

  useTitle("Statistics", team.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Teams", to: leaguePaths.Teams.Index },
    { title: team.name + " Statistics" },
  ]);

  return (
    <>
      <TeamMenu team={team} />
      <h3 className={"py-1 border-b-1 border-b-gray-700"}>Averages</h3>
      <StatisticsTable statisticsLogs={statisticsLogs} />
      <h3 className={"py-1 border-b-1 border-b-gray-700"}>Totals</h3>
      <StatisticsTable statisticsLogs={statisticsLogs} />
    </>
  );
}

export { StatisticsPage as TeamStatisticsPage };
