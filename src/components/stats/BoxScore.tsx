import { findPlayerById } from "../../data/players.ts";
import { findTeamById } from "../../data/teams.ts";
import type { PlayerLog } from "../../types/game/PlayerLog.ts";
import type { TeamLog } from "../../types/game/TeamLog.ts";
import type { Totals } from "../../types/stats/Totals.ts";
import type { Team } from "../../types/Team.ts";
import PlayerLink from "../links/PlayerLink.tsx";
import TotalsRow from "./row/TotalsRow.tsx";

type BoxScoreProps = {
  teamLog: TeamLog,
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
      <div className={"box-score p-2"}>
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
              <TotalsRow totals={playerLog}>
                <PlayerLink player={findPlayerById(playerLog.playerId)} />
              </TotalsRow>
            </tr>
          ))}
          </tbody>
          <tfoot>
          <tr>
            <TotalsRow totals={getTotals(teamLog.playerLogs)} headings={true} />
          </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
