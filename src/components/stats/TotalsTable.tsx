import type { GameLog } from "../../data/games.ts";
import type { Team } from "../../types/Team.ts";
import { getTotals } from "../../utilities/StatsUtils.ts";
import TeamLink from "../links/TeamLink.tsx";
import TeamsRow from "./row/TeamsRow.tsx";
import TitlesRow from "./row/TitlesRow.tsx";
import TotalsRow from "./row/TotalsRow.tsx";

type TotalsTableProps = {
  team: Team,
  gameLogs: Array<GameLog>,
}

export default function TotalsTable({ team, gameLogs }: TotalsTableProps) {
  const totals = getTotals(gameLogs.map(({ totals }) => totals));

  return (
    <>
      <div className={"game-log py-2"}>
        <table className={"w-full"}>
          <thead>
          <tr>
            <TeamsRow team={team}>
              Totals
            </TeamsRow>
          </tr>
          <tr className="bg-gray-200 border-b border-gray-300">
            <TitlesRow/>
          </tr>
          </thead>
          <tbody>
          <tr>
            <TotalsRow totals={totals}>
              <TeamLink team={team} />
            </TotalsRow>
          </tr>
          </tbody>
          <tfoot>
          <tr className="border-t border-gray-300">
            {/* this will eventually span across seasons */}
            <TotalsRow totals={totals} headings={true}>
              Totals
            </TotalsRow>
          </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
