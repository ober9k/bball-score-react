import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import TeamLink from "../components/links/TeamLink.tsx";
import { Paths } from "../routes/paths.ts";

export default function Standings() {
  const { standings } = getRouteApi(Paths.Standings).useLoaderData();
  const { standingsRows } = standings;

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
            <th className={"p-2 text-sm w-16"}>W</th>
            <th className={"p-2 text-sm w-16"}>L</th>
            <th className={"p-2 text-sm w-16"}>D</th>
            <th className={"p-2 text-sm w-16"}>B</th>
            <th className={"p-2 text-sm w-16"}>PF</th>
            <th className={"p-2 text-sm w-16"}>PA</th>
          </tr>
          </thead>
          <tbody>
          {standingsRows.map((standingsRow) => (
            <tr key={standingsRow.id} className="even:bg-gray-100">
              <td className={"px-4 py-2 text-left text-sm"}>
                <TeamLink team={standingsRow.team}/>
              </td>
              <td className={"p-2 text-sm"}>{standingsRow.wins}</td>
              <td className={"p-2 text-sm"}>{standingsRow.losses}</td>
              <td className={"p-2 text-sm"}>{standingsRow.draws}</td>
              <td className={"p-2 text-sm"}>{standingsRow.byes}</td>
              <td className={"p-2 text-sm"}>{standingsRow.pointsFor}</td>
              <td className={"p-2 text-sm"}>{standingsRow.pointsAgainst}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </Content>
    </>
  )
}
