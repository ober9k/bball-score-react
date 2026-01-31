import { mockGames } from "../data/Games.ts";
import { mockTeams } from "../data/Teams.ts";
import type { Team } from "../types/Team.ts";
import BoxScoreTable from "./stats/BoxScoreTable.tsx";

/**
 * TEMP
 * @param teamId
 */
function getTeamById(teamId: number): Team {
  return mockTeams.find(({ id }) => id === teamId)!;
}

export default function GameList() {
  const games = mockGames;

  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <p>
              <strong>
                {getTeamById(game.teamLogs[0].teamId).name}
              </strong> vs. <strong>
                {getTeamById(game.teamLogs[1].teamId).name}
              </strong>
            </p>
            <p>
              {game.date.toLocaleDateString()}
            </p>
            {game.teamLogs.map((teamLog) => (
              <>
                <h3>{getTeamById(teamLog.teamId).name}</h3>
                <BoxScoreTable teamLog={teamLog} />
              </>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}