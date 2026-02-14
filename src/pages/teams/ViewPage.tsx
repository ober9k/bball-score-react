import { getRouteApi } from "@tanstack/react-router";
import Content from "../../components/layout/page/Content.tsx";
import Header from "../../components/layout/page/Header.tsx";
import SubHeading from "../../components/layout/page/SubHeading.tsx";
import PlayersList from "../../components/PlayersList.tsx";
import StatisticsTable from "../../components/stats/StatisticsTable.tsx";
import { Paths } from "../../routes/paths.ts";
import type { Player } from "../../types/Player.ts";
import type { StatisticsLog } from "../../types/StatisticsLog.ts";
import type { Team } from "../../types/Team.ts";

type LoaderData = {
  team: Team,
  teamPlayers: Array<Player>,
  teamStatistics: Array<StatisticsLog>,
}

export default function ViewPage() {
  const { team, teamPlayers: players, teamStatistics: statisticsLogs }: LoaderData = getRouteApi(Paths.Team).useLoaderData();

  return (
    <>
      <Header>
        Team
      </Header>
      <Content>
        <p>
          Team: <strong>{team.name}</strong>
        </p>
        <SubHeading>
          Current Season Roster
        </SubHeading>
        <PlayersList players={players} />
        <SubHeading>
          Current Season Statistics
        </SubHeading>
        <StatisticsTable statisticsLogs={statisticsLogs} />
      </Content>
    </>
  )
}
