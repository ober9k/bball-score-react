import type { PlayerStatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { PlayerMenu } from "@/components/players/player-menu.tsx";
import { StatisticsTable } from "@/components/statistics/statistics-table.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function StatisticsPage() {
  const { player, statisticsLogs }: PlayerStatisticsLoaderProps = getRouteApi(leaguePaths.Players.Statistics).useLoaderData();

  useTitle("Statistics", player.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Players", to: leaguePaths.Players.Index },
    { title: player.name + " Statistics" },
  ]);

  return (
    <>
      <PlayerMenu player={player} />
      <h3 className={"py-1 border-b-1 border-b-gray-700"}>Averages</h3>
      <StatisticsTable statisticsLogs={statisticsLogs} />
      <h3 className={"py-1 border-b-1 border-b-gray-700"}>Totals</h3>
      <StatisticsTable statisticsLogs={statisticsLogs} />
    </>
  );
}

export { StatisticsPage as PlayersStatisticsPage };
