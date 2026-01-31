import { mockPlayers } from "../../data/Players.ts";
import type { PlayerLog } from "../../types/game/PlayerLog.ts";
import type { TeamLog } from "../../types/game/TeamLog.ts";
import type { Team } from "../../types/Team.ts";

type BoxScoreTableProps = {
  teamLog: TeamLog,
}

type Totals = {
  points: number,
  rebounds: number,
  assists: number,
}

/**
 * TEMP
 * @param playerId
 */
function getPlayerById(playerId: number): Team {
  return mockPlayers.find(({ id }) => id === playerId)!;
}

/**
 * TEMP: NOT EFFICIENT
 * @param playerLogs
 */
function getTotals(playerLogs: Array<PlayerLog>): Totals {
  const totals = {
    points: 0,
    rebounds: 0,
    assists: 0,
  };

  return playerLogs.reduce((acc: Totals, cur) => {
    acc.points += cur.points;
    acc.rebounds += cur.rebounds;
    acc.assists += cur.assists;

    return acc;
  }, totals)
}

export default function BoxScoreTable({ teamLog }: BoxScoreTableProps) {
  return (
    <>
      <table className={"w-full"}>
        <thead>
        <tr>
          <th>&nbsp;</th>
          <th>PTS</th>
          <th>REB</th>
          <th>AST</th>
        </tr>
        </thead>
        <tbody>
        {teamLog.playerLogs.map((playerLog) => (
        <tr>
          <td>{getPlayerById(playerLog.playerId).name}</td>
          <td>{playerLog.points}</td>
          <td>{playerLog.rebounds}</td>
          <td>{playerLog.assists}</td>
        </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>&nbsp;</th>
          <th>{getTotals(teamLog.playerLogs).points}</th>
          <th>{getTotals(teamLog.playerLogs).rebounds}</th>
          <th>{getTotals(teamLog.playerLogs).assists}</th>
        </tr>
        </tfoot>
      </table>
    </>
  );
}
