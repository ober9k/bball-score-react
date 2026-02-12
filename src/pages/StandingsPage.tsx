import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import TeamLink from "../components/links/TeamLink.tsx";
import { Paths } from "../routes/paths.ts";

export default function StandingsPage() {
  const { standings } = getRouteApi(Paths.Standings).useLoaderData();
  const { standingsLogs } = standings;

  return (
    <>
      <Header>
        Standings
      </Header>
      <Content>
        <table className="w-full">
          <thead>
          <tr className="bg-gray-200 border-b border-gray-300">
            <th className={"px-4 py-2 text-left text-sm"}>&nbsp;</th>
            <th className={"p-2 text-sm w-12"}>W</th>
            <th className={"p-2 text-sm w-12"}>L</th>
            <th className={"p-2 text-sm w-12"}>D</th>
            <th className={"p-2 text-sm w-12"}>B</th>
            <th className={"p-2 text-sm w-12 hidden sm:table-cell"}>PF</th>
            <th className={"p-2 text-sm w-12 hidden sm:table-cell"}>PA</th>
          </tr>
          </thead>
          <tbody>
          {standingsLogs.map((standingsLog) => (
            <tr key={standingsLog.id} className="even:bg-gray-100">
              <td className={"px-4 py-2 text-left text-sm"}>
                <TeamLink team={standingsLog.team}/>
              </td>
              <td className={"p-2 text-sm"}>{standingsLog.wins}</td>
              <td className={"p-2 text-sm"}>{standingsLog.losses}</td>
              <td className={"p-2 text-sm"}>{standingsLog.draws}</td>
              <td className={"p-2 text-sm"}>{standingsLog.byes}</td>
              <td className={"p-2 text-sm hidden sm:table-cell"}>{standingsLog.pointsFor}</td>
              <td className={"p-2 text-sm hidden sm:table-cell"}>{standingsLog.pointsAgainst}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </Content>
    </>
  )
}
