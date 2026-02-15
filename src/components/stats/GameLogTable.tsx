import type { GameLog } from "../../data/games.ts";
import type { Team } from "../../types/Team.ts";
import { getAveragesX } from "../../utilities/StatsUtils.ts";
import TeamLink from "../links/TeamLink.tsx";
import AveragesRow from "./row/AveragesRow.tsx";
import TeamsRow from "./row/TeamsRow.tsx";
import TitlesRow from "./row/TitlesRow.tsx";
import TotalsRow from "./row/TotalsRow.tsx";

type GameResultProps = {
  ownScore: number,
  opposingScore: number,
}

function getGameResult(ownScore, opposingScore): string {
  switch (true) {
    case (ownScore > opposingScore): return 'W';
    case (ownScore < opposingScore): return 'L';
    default: return 'D';
  }
}

function GameResult({ ownScore, opposingScore }: GameResultProps) {
  return (
    <>
      {getGameResult(ownScore, opposingScore)} {ownScore}-{opposingScore}
    </>
  );
}

type GameLogTableProps = {
  team: Team,
  gameLogs: Array<GameLog>,
}

export default function GameLogTable({ team, gameLogs }: GameLogTableProps) {
  const averages = getAveragesX(gameLogs.map(({ totals }) => totals));

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
          <tr className="bg-gray-200 border-b border-gray-300">
            <TitlesRow/>
          </tr>
          </thead>
          <tbody>
          {gameLogs.map((gameLog) => (
            <tr key={gameLog.id}>
              <TotalsRow totals={gameLog.totals}>
                {gameLog.atHome ? "vs" : "@"} <TeamLink team={gameLog.opposingTeam}/>&nbsp;
                <small className="text-gray-400">
                  <GameResult ownScore={gameLog.ownScore} opposingScore={gameLog.opposingScore}/>
                </small>
              </TotalsRow>
            </tr>
          ))}
          </tbody>
          <tfoot>
          <tr className="border-t border-gray-300">
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
