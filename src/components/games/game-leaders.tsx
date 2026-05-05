import PlayerCard from "@/components/players/player-card.tsx";
import { calcLeaderScore } from "@/lib/game-utils.ts";
import type { Game, PlayerLog, TeamLog } from "@/types/game.ts";
import { Fragment } from "react";

type GameLeadersProps = {
  game: Game,
};

export function GameLeaders(props: GameLeadersProps) {

  const getLeader = (teamLog: TeamLog): PlayerLog => {
    return teamLog.playerLogs.reduce((acc: PlayerLog, cur: PlayerLog) => {
      return (acc && calcLeaderScore(acc.stats) > calcLeaderScore(cur.stats))
        ? acc
        : cur;
    }, {} as PlayerLog);
  };

  const awayLeader = getLeader(props.game.teamLogs[0]);
  const homeLeader = getLeader(props.game.teamLogs[1]);

  return (
    <Fragment>
      <p>leaders...</p>
      <div className="flex gap-4 pt-4">
        <PlayerCard player={awayLeader.player} stats={awayLeader.stats} />
        <PlayerCard player={homeLeader.player} stats={homeLeader.stats} />
      </div>
    </Fragment>
  );
}
