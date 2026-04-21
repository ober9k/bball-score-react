import type { TeamStatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { StatisticsTable } from "@/components/statistics/statistics-table.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function StatisticsPage() {
  const { team, statistics }: TeamStatisticsLoaderProps = getRouteApi(leaguePaths.Teams.Statistics).useLoaderData();

  useTitle("Statistics");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Teams", to: leaguePaths.Teams.Index },
    { title: team.name + "Statistics" },
  ]);

  const [ sort, setSort ] = useState("points");
  const [ statisticsLogs, setStatisticsLogs] = useState(Object.values(statistics));

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
      <StatisticsTable statisticsLogs={statisticsLogs} />
    </>
  );
}

export { StatisticsPage as TeamStatisticsPage };
