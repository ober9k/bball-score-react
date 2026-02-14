import { getRouteApi } from "@tanstack/react-router";
import Content from "../components/layout/page/Content.tsx";
import Header from "../components/layout/page/Header.tsx";
import SubHeading from "../components/layout/page/SubHeading.tsx";
import TeamLink from "../components/links/TeamLink.tsx";
import { Paths } from "../routes/paths.ts";
import type { StandingsLog } from "../types/StandingsLog.ts";

type StandingsLoadingData = {
  standingsLogs: Array<StandingsLog>,
}

export default function StandingsPage() {
  const { standingsLogs } = getRouteApi(Paths.Standings).useLoaderData() as StandingsLoadingData;

  return (
    <>
      <Header>
        Standings
      </Header>
      <Content>
        <SubHeading>
          Current Season
        </SubHeading>
        <div className={"standings-log py-2"}>
          <table className="w-full">
            <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className={"px-4 py-2 text-left text-sm border-r-1 border-gray-300"}>&nbsp;</th>
              <th className={"p-2 text-sm text-center w-12"}>W</th>
              <th className={"p-2 text-sm text-center w-12"}>L</th>
              <th className={"p-2 text-sm text-center w-12"}>D</th>
              <th className={"p-2 text-sm text-center w-12"}>B</th>
              <th className={"p-2 text-sm text-center w-12 hidden sm:table-cell"}>PF</th>
              <th className={"p-2 text-sm text-center w-12 hidden sm:table-cell"}>PA</th>
            </tr>
            </thead>
            <tbody>
            {standingsLogs.map((standingsLog) => (
              <tr key={standingsLog.id} className="even:bg-gray-100">
                <td className={"px-4 py-2 text-left text-sm border-r-1 border-gray-200"}>
                  <TeamLink team={standingsLog.team}/>
                </td>
                <td className={"p-2 text-sm text-center"}>{standingsLog.wins}</td>
                <td className={"p-2 text-sm text-center"}>{standingsLog.losses}</td>
                <td className={"p-2 text-sm text-center"}>{standingsLog.draws}</td>
                <td className={"p-2 text-sm text-center"}>{standingsLog.byes}</td>
                <td className={"p-2 text-sm text-center hidden sm:table-cell"}>{standingsLog.pointsFor}</td>
                <td className={"p-2 text-sm text-center hidden sm:table-cell"}>{standingsLog.pointsAgainst}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </Content>
    </>
)
}
