import type { TeamLog } from "../../types/game/TeamLog.ts";
import { getTotals } from "../../utilities/StatsUtils.ts";
import PlayerLink from "../links/PlayerLink.tsx";
import TeamsRow from "./row/TeamsRow.tsx";
import TitlesRow from "./row/TitlesRow.tsx";
import TotalsRow from "./row/TotalsRow.tsx";

type BoxScoreProps = {
  teamLog: TeamLog,
}

export default function BoxScore({ teamLog }: BoxScoreProps) {
  return (
    <>
      <div className={"box-score p-2"}>
        <table className={"w-full"}>
          <thead>
          <tr>
            {/* `teamLog.team` will always be set */}
            <TeamsRow team={teamLog.team!}>
              {teamLog.team!.name} (0-0-0)
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
                {/* `playerLog.player` will always be set */}
                <PlayerLink player={playerLog.player!} />
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
