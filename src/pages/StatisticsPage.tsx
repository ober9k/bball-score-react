import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import PlayerLink from "../components/links/PlayerLink.tsx";
import AveragesRow from "../components/stats/row/AveragesRow.tsx";
import TitlesRow from "../components/stats/row/TitlesRow.tsx";
import { Paths } from "../routes/paths.ts";
import type { StatisticsLog } from "../types/StatisticsLog.ts";

type StatisticsLoadingData = {
  statisticsLogs: Array<StatisticsLog>,
}

export default function StatisticsPage() {
  const { statisticsLogs } = getRouteApi(Paths.Statistics).useLoaderData() as StatisticsLoadingData;

  statisticsLogs.sort((statisticsLogA, statisticsLogB) => {
    const { points: pointsA } = statisticsLogA;
    const { points: pointsB } = statisticsLogB;

    return (pointsA === pointsB)
      ? 0 : (pointsA > pointsB)
        ?  -1 : 1;
  });

  return (
    <>
      <Header>
        Statistics
      </Header>
      <Content>
        <div className={"game-log py-2"}>
          <table className={"w-full"}>
            <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <TitlesRow/>
            </tr>
            </thead>
            <tbody>
            {statisticsLogs.map((statisticsLog) => (
              <tr key={statisticsLog.id}>
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
