import type { StatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { StatsRow, StatsTitleCell } from "@/components/stats/stats-row.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import { StatsKey } from "@/types/stats.ts";
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
          <TableRow>
            <TableHead>Player</TableHead>
            <StatsTitleCell statsKey={StatsKey.Minutes} />
            <StatsTitleCell statsKey={StatsKey.FieldGoals} />
            <StatsTitleCell statsKey={StatsKey.ThreePointFieldGoals} />
            <StatsTitleCell statsKey={StatsKey.FreeThrows} />
            <StatsTitleCell statsKey={StatsKey.Rebounds} />
            <StatsTitleCell statsKey={StatsKey.Assists} />
            <StatsTitleCell statsKey={StatsKey.Steals} />
            <StatsTitleCell statsKey={StatsKey.Blocks} />
            <StatsTitleCell statsKey={StatsKey.Turnovers} />
            <StatsTitleCell statsKey={StatsKey.PersonalFouls} />
            <StatsTitleCell statsKey={StatsKey.Points} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {statisticsLogs.map(({ player, played, stats }) => (
            <StatsRow key={player.id} player={player} played={played} stats={stats} averages={true} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { StatisticsPage as LeagueStatisticsPage };
