import { Link } from "@tanstack/react-router";
import { findPlayerById } from "../../data/Players.ts";
import { findTeamById } from "../../data/Teams.ts";
import { Paths } from "../../routes/paths.ts";
import type { PlayerLog } from "../../types/game/PlayerLog.ts";
import type { TeamLog } from "../../types/game/TeamLog.ts";
import type { Team } from "../../types/Team.ts";

type BoxScoreProps = {
  teamLog: TeamLog,
}

type Totals = {
  points: number,
  rebounds: number,
  assists: number,
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

function getTeamStyle(team: Team): { color: string, backgroundColor: string } {
  return {
    color: team.teamStyle.textColor,
    backgroundColor: team.teamStyle.bgColor,
  }
}

export default function BoxScore({ teamLog }: BoxScoreProps) {
  const team = findTeamById(teamLog.teamId);

  return (
    <>
      <div className={"boxscore p-2"}>
        <table className={"w-full"}>
          <thead>
          <tr>
            <th colSpan={4} className={"text-left px-2 py-1 font-medium"} style={getTeamStyle(team)}>
              {team.name} <span className={"font-normal"}>(0-0-0)</span>
            </th>
          </tr>
          <tr>
            <th className={"p-1 text-left text-sm"}>&nbsp;</th>
            <th className={"w-20 p-1 text-sm"}>PTS</th>
            <th className={"w-20 p-1 text-sm"}>REB</th>
            <th className={"w-20 p-1 text-sm"}>AST</th>
          </tr>
          </thead>
          <tbody>
          {teamLog.playerLogs.map((playerLog) => (
          <tr key={playerLog.id}>
            <td className={"p-1 text-left text-sm"}>
              <Link to={Paths.Player} params={{ playerId: playerLog.playerId }}>
                {findPlayerById(playerLog.playerId).name}
              </Link>
            </td>
            <td className={"p-1 text-sm"}>{playerLog.points}</td>
            <td className={"p-1 text-sm"}>{playerLog.rebounds}</td>
            <td className={"p-1 text-sm"}>{playerLog.assists}</td>
          </tr>
          ))}
          </tbody>
          <tfoot>
          <tr>
            <th className={"p-1 text-left text-sm"}>&nbsp;</th>
            <th className={"p-1 text-sm"}>{getTotals(teamLog.playerLogs).points}</th>
            <th className={"p-1 text-sm"}>{getTotals(teamLog.playerLogs).rebounds}</th>
            <th className={"p-1 text-sm"}>{getTotals(teamLog.playerLogs).assists}</th>
          </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
