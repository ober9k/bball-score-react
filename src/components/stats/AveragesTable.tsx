import type { GameLog } from "../../data/games.ts";
import type { Team } from "../../types/Team.ts";
import { getAverages } from "../../utilities/StatsUtils.ts";
import TeamLink from "../links/TeamLink.tsx";
import AveragesRow from "./row/AveragesRow.tsx";
import TeamsRow from "./row/TeamsRow.tsx";
import TitlesRow from "./row/TitlesRow.tsx";

type AveragesTableProps = {
  team: Team,
  gameLogs: Array<GameLog>,
}

export default function AveragesTable({ team, gameLogs }: AveragesTableProps) {
  const averages = getAverages(gameLogs.map(({ totals }) => totals));

  return (
    <>
      <div className={"game-log py-2"}>
        <table className={"w-full"}>
          <thead>
          <tr>
            <TeamsRow team={team}>
              Averages
            </TeamsRow>
          </tr>
          <tr className="bg-gray-200 border-b border-gray-300">
            <TitlesRow/>
          </tr>
          </thead>
          <tbody>
          <tr>
            <AveragesRow averages={averages}>
              <TeamLink team={team} />
            </AveragesRow>
          </tr>
          </tbody>
          <tfoot>
          <tr className="border-t border-gray-300">
            {/* this will eventually span across seasons */}
            <AveragesRow averages={averages} headings={true}>
              Averages
            </AveragesRow>
          </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
