import { getRouteApi } from "@tanstack/react-router";
import BoxScore from "../components/stats/BoxScore.tsx";
import { Paths } from "../routes/paths.ts";

export default function Game() {
  const { game } = getRouteApi(Paths.Game).useLoaderData();


  return (
    <>
      <h2>Game</h2>
      {game.teamLogs.map((teamLog) => (
        <div key={teamLog.id}>
          <BoxScore teamLog={teamLog} />
        </div>
      ))}
    </>
  )
}
