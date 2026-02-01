import { findTeamById } from "../data/Teams.ts";
import type { Game } from "../types/Game.ts";
import type { TeamLog } from "../types/game/TeamLog.ts";
import BoxScoreTable from "./stats/BoxScoreTable.tsx";

type GamesListProps = {
  games: Array<Game>,
}

function getTeamName(teamLog: TeamLog): string {
  return findTeamById(teamLog.teamId).name;
}

export default function GamesList({ games }: GamesListProps) {
  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <p>
              <strong>
                {getTeamName(game.teamLogs[0])}
              </strong> vs. <strong>
                {getTeamName(game.teamLogs[1])}
              </strong>
            </p>
            <p>
              {game.date.toLocaleDateString()}
            </p>
            {game.teamLogs.map((teamLog) => (
              <div key={teamLog.id}>
                <h3>{getTeamName(teamLog)}</h3>
                <BoxScoreTable teamLog={teamLog} />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}