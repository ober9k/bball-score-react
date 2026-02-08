import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import GameLogTable from "../components/stats/GameLogTable.tsx";
import TeamsRow from "../components/stats/row/TeamsRow.tsx";
import type { GameLog } from "../data/games.ts";
import { Paths } from "../routes/paths.ts";
import type { Team } from "../types/Team.ts";

type PlayerLoaderData = {
  player: any, /* naming conflict */
  team: Team,
  gameLogs: Array<GameLog>,
}

export default function Player() {
  const { player, team, gameLogs }: PlayerLoaderData = getRouteApi(Paths.Player).useLoaderData();

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
        <div className={"averages py-2"}>
          <table className={"w-full"}>
            <thead>
            <tr>
              <TeamsRow team={team}>
                Averages
              </TeamsRow>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan={4} className={"totals p-2"}>
                &ndash; TBD &ndash;
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className={"totals py-2"}>
          <table className={"w-full"}>
            <thead>
            <tr>
              <TeamsRow team={team}>
                Totals
              </TeamsRow>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan={4} className={"totals p-2"}>
                &ndash; TBD &ndash;
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </Content>
    </>
  )
}
