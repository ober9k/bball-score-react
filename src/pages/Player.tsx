import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import TeamsRow from "../components/stats/row/TeamsRow.tsx";
import { Paths } from "../routes/paths.ts";

export default function Player() {
  const { player, team } = getRouteApi(Paths.Player).useLoaderData();

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
        <div className={"game-log p-2"}>
          <table className={"w-full"}>
            <thead>
            <tr>
              <TeamsRow team={team}>
                Game Log
              </TeamsRow>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td colSpan={4}>
                &ndash; TBD &ndash;
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className={"averages p-2"}>
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
              <td colSpan={4}>
                &ndash; TBD &ndash;
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className={"totals p-2"}>
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
              <td colSpan={4}>
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
