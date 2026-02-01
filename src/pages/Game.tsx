import { getRouteApi } from "@tanstack/react-router";
import BoxScoreTable from "../components/stats/BoxScoreTable.tsx";
import { Paths } from "../routes/paths.ts";

export default function Game() {
  const { game } = getRouteApi(Paths.Game).useLoaderData();


  return (
    <>
      <h2>Game</h2>
      {game.teamLogs.map((teamLog) => (
        <div key={teamLog.id}>
          <BoxScoreTable teamLog={teamLog} />
        </div>
      ))}
    </>
  )
}
