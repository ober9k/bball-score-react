import { getRouteApi } from "@tanstack/react-router";
import Content from "../../components/layout/page/Content.tsx";
import Header from "../../components/layout/page/Header.tsx";
import BoxScoreTable from "../../components/stats/BoxScoreTable.tsx";
import Matchup from "../../components/stats/Matchup.tsx";
import { Paths } from "../../routes/paths.ts";

export default function ViewPage() {
  const { game } = getRouteApi(Paths.Game).useLoaderData();

  return (
    <>
      <Header>
        Game
      </Header>
      <Content>
        <Matchup game={game} />
        {game.teamLogs.map((teamLog) => (
          <div key={teamLog.id}>
            <BoxScoreTable teamLog={teamLog} />
          </div>
        ))}
      </Content>
    </>
  )
}
