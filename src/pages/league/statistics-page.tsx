import type { StatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { StatsValuesRow } from "@/components/stats/stats-values-row.tsx";
import { StatsTitlesRow } from "@/components/stats/stats-titles-row.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableHeader } from "@/shared/components/ui/table.tsx";
import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function StatisticsPage() {
  const { statistics }: StatisticsLoaderProps = getRouteApi(leaguePaths.League.Statistics).useLoaderData();

  useTitle("Statistics");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Statistics" },
  ]);

  const [ sort, setSort ] = useState("points");
  const [ statisticsLogs, setStatisticsLogs] = useState(statistics);

  useEffect(() => {
    setStatisticsLogs((statisticsLogs) => {
      return  statisticsLogs.sort((sla, slb) => {
        if (sla.stats.points < slb.stats.points) return  1;
        if (sla.stats.points > slb.stats.points) return -1;
        return 0;
      });
    });
  }, [sort]);

  return (
    <>
      <Table>
        <TableHeader>
          <StatsTitlesRow />
        </TableHeader>
        <TableBody>
          {statisticsLogs.map(({ player, played, stats }) => (
            <StatsValuesRow key={player.id} player={player} played={played} stats={stats} averages={true} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { StatisticsPage as LeagueStatisticsPage };
