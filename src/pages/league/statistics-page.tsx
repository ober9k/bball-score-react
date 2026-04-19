import type { StatisticsLoaderProps } from "@/apis/loaders/types.ts";
import { StatisticsTable } from "@/components/statistics/statistics-table.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
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
      <StatisticsTable statisticsLogs={statisticsLogs} />
    </>
  );
}

export { StatisticsPage as LeagueStatisticsPage };
