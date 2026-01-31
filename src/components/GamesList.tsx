import { mockGames } from "../data/Games.ts";
import { findTeamById } from "../data/Teams.ts";
import type { TeamLog } from "../types/game/TeamLog.ts";
import BoxScoreTable from "./stats/BoxScoreTable.tsx";

function getTeamName(teamLog: TeamLog): string {
  return findTeamById(teamLog.teamId).name;
}

export default function GamesList() {
  const games = mockGames;

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
              <>
                <h3>{getTeamName(teamLog)}</h3>
                <BoxScoreTable teamLog={teamLog} />
              </>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}