import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import PlayerLink from "../components/links/PlayerLink.tsx";
import AveragesRow from "../components/stats/row/AveragesRow.tsx";
import TitlesRow from "../components/stats/row/TitlesRow.tsx";
import TitlesRowWithSort from "../components/stats/row/TitlesRowWithSort.tsx";
import { Paths } from "../routes/paths.ts";
import type { StatisticsLog } from "../types/StatisticsLog.ts";

type StatisticsLoadingData = {
  statisticsLogs: Array<StatisticsLog>,
}

function sortStatisticsByKey(sort: string) {
  return (statisticsLogA, statisticsLogB) => {
    const valueA = statisticsLogA[sort];
    const valueB = statisticsLogB[sort];

    return (valueA === valueB) ? 0 : (valueA > valueB) ?  -1 : 1;
  };
}

export default function StatisticsPage() {
  const { statisticsLogs } = getRouteApi(Paths.Statistics).useLoaderData() as StatisticsLoadingData;
  const [ sort, setSort ] = useState("points");
  const [ sortedLogs, setSortedLogs ] = useState(statisticsLogs);

  useEffect(() => {
    setSortedLogs([...statisticsLogs.sort(sortStatisticsByKey(sort))]);
  }, [statisticsLogs, sort])

  return (
    <>
      <Header>
        Statistics
      </Header>
      <Content>
        <div className={"statistics py-2"}>
          <table className={"w-full"}>
            <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <TitlesRowWithSort sort={sort} setSort={setSort}/>
            </tr>
            </thead>
            <tbody>
            {sortedLogs.map((statisticsLog) => (
              <tr key={statisticsLog.id} className="even:bg-gray-100">
                <AveragesRow averages={statisticsLog}>
                  <PlayerLink player={statisticsLog.player}/>
                </AveragesRow>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Content>
    </>
  )
}
