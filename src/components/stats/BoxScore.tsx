import { findPlayerById } from "../../data/players.ts";
import { findTeamById } from "../../data/teams.ts";
import type { PlayerLog } from "../../types/game/PlayerLog.ts";
import type { TeamLog } from "../../types/game/TeamLog.ts";
import type { Totals } from "../../types/stats/Totals.ts";
import PlayerLink from "../links/PlayerLink.tsx";
import TeamsRow from "./row/TeamsRow.tsx";
import TitlesRow from "./row/TitlesRow.tsx";
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

export default function BoxScore({ teamLog }: BoxScoreProps) {
  const team = findTeamById(teamLog.teamId);

  return (
    <>
      <div className={"box-score p-2"}>
        <table className={"w-full"}>
          <thead>
          <tr>
            <TeamsRow team={team}>
              {team.name} (0-0-0)
            </TeamsRow>
          </tr>
          <tr>
            <TitlesRow />
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
