import { getRouteApi } from "@tanstack/react-router";
import Content from "../../components/layout/page/Content.tsx";
import Header from "../../components/layout/page/Header.tsx";
import AveragesTable from "../../components/stats/AveragesTable.tsx";
import GameLogTable from "../../components/stats/GameLogTable.tsx";
import TotalsTable from "../../components/stats/TotalsTable.tsx";
import type { GameLog } from "../../data/games.ts";
import { Paths } from "../../routes/paths.ts";
import type { Team } from "../../types/Team.ts";

type LoaderData = {
  player: any, /* naming conflict */
  team: Team,
  gameLogs: Array<GameLog>,
}

export default function ViewPage() {
  const { player, team, gameLogs }: LoaderData = getRouteApi(Paths.Player).useLoaderData();

  return (
    <>
      <Header>
        Player
      </Header>
      <Content>
        <p>
          Player: <strong>{player.name}</strong><br/>
          Team: <strong>{team.name}</strong><br/>
        </p>
        <GameLogTable team={team} gameLogs={gameLogs} />
        <AveragesTable team={team} gameLogs={gameLogs} />
        <TotalsTable team={team} gameLogs={gameLogs} />
      </Content>
    </>
  )
}
