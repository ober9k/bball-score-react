import { getRouteApi } from "@tanstack/react-router";
import TeamLink from "../components/links/TeamLink.tsx";
import { Paths } from "../routes/paths.ts";

export default function Standings() {
  const { standings } = getRouteApi(Paths.Standings).useLoaderData();
  const { standingsRows } = standings;

  return (
    <>
      <h2>Standings</h2>
      <table>
        <thead>
        <tr>
          <th className={"px-2 py-1 text-left text-sm"}>&nbsp;</th>
          <th className={"p-1 text-sm w-16"}>W</th>
          <th className={"p-1 text-sm w-16"}>L</th>
          <th className={"p-1 text-sm w-16"}>D</th>
          <th className={"p-1 text-sm w-16"}>B</th>
          <th className={"p-1 text-sm w-16"}>PF</th>
          <th className={"p-1 text-sm w-16"}>PA</th>
        </tr>
        </thead>
        <tbody>
        {standingsRows.map((standingsRow) => (
          <tr key={standingsRow.id}>
            <td className={"px-2 py-1 text-left text-sm"}>
              <TeamLink team={standingsRow.team} />
            </td>
            <td className={"p-1 text-sm"}>{standingsRow.wins}</td>
            <td className={"p-1 text-sm"}>{standingsRow.losses}</td>
            <td className={"p-1 text-sm"}>{standingsRow.draws}</td>
            <td className={"p-1 text-sm"}>{standingsRow.byes}</td>
            <td className={"p-1 text-sm"}>{standingsRow.pointsFor}</td>
            <td className={"p-1 text-sm"}>{standingsRow.pointsAgainst}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}
