import { getRouteApi } from "@tanstack/react-router";
import usePageContext from "../components/hooks/usePageContext.ts";
import BoxScore from "../components/stats/BoxScore.tsx";
import Matchup from "../components/stats/Matchup.tsx";
import { Paths } from "../routes/paths.ts";

export default function Game() {
  const { game } = getRouteApi(Paths.Game).useLoaderData();
  const { setTitle } = usePageContext();
  setTitle("Game");


  return (
    <>
      <h2>Game</h2>
      <Matchup game={game} />
      {game.teamLogs.map((teamLog) => (
        <div key={teamLog.id}>
          <BoxScore teamLog={teamLog} />
        </div>
      ))}
    </>
  )
}
