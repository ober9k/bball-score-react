import type { Game } from "../types/Game.ts";
import BoxScoreTable from "./stats/BoxScoreTable.tsx";
import Matchup from "./stats/Matchup.tsx";

type GamesListProps = {
  games: Array<Game>,
}

export default function GamesList({ games }: GamesListProps) {
  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Matchup game={game} />
            {game.teamLogs.map((teamLog) => (
              <div key={teamLog.id}>
                <BoxScoreTable teamLog={teamLog} />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}