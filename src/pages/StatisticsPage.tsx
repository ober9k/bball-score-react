import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import SubHeading from "../components/layout/page/SubHeading.tsx";
import StatisticsTable from "../components/stats/StatisticsTable.tsx";
import { Paths } from "../routes/paths.ts";
import type { StatisticsLog } from "../types/StatisticsLog.ts";

type StatisticsLoadingData = {
  statisticsLogs: Array<StatisticsLog>,
}

export default function StatisticsPage() {
  const { statisticsLogs } = getRouteApi(Paths.Statistics).useLoaderData() as StatisticsLoadingData;

  return (
    <>
      <Header>
        Statistics
      </Header>
      <Content>
        <SubHeading>
          Current Season
        </SubHeading>
        <StatisticsTable statisticsLogs={statisticsLogs} />
      </Content>
    </>
  )
}
