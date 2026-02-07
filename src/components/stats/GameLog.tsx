import { findTeamById } from "../../data/teams.ts";
import type { Game } from "../../types/Game.ts";
import TeamsRow from "./row/TeamsRow.tsx";
import TitlesRow from "./row/TitlesRow.tsx";

/**
 * Convenience structure for displaying the game log.
 */
export type GameLogRow = {
  id: number,
  game: Game,
}

type GameLogProps = {
  games: Array<Game>,
}

export default function GameLog({ games }: GameLogProps) {
  const gameLogs = games.map((game) => {
      return {
        id: game.id,
        game: game,
      }
  });

  const team = findTeamById(11); /* temp */

  function isHomeTeam(teamId: number): boolean {
    return teamId === team.id;
  }

  return (
    <>
      <div className={"game-log py-2"}>
        <table className={"w-full"}>
          <thead>
          <tr>
            <TeamsRow team={team}>
              Game Log
            </TeamsRow>
          </tr>
          <tr>
            <TitlesRow/>
          </tr>
          </thead>
          <tbody>
          {gameLogs.map((gameLog) => (
            <tr key={gameLog.id}>
              <td colSpan={4}>xxx</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan={4}>yyy</td>
          </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
