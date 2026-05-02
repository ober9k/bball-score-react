import { GameScore } from "@/components/games/game-score.tsx";
import { GameLink, TeamLink } from "@/components/shared/links.tsx";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card.tsx";
import type { Game } from "@/types/game.ts";
import { Fragment } from "react";

type Props = {
  game: Game,
};

export default function GameCard({ game }: Props) {
  /* this should later check the actual flag */
  const [ awayTeamLog, homeTeamLog ] = game.teamLogs;

  if (game.teamLogs.length === 0) {
    return undefined; /* no data, don't show anything */
  }

  return (
    <Fragment>
      <Card>
        {/*<CardHeader>
          <CardTitle>
            ...
          </CardTitle>
        </CardHeader>*/}
        <CardContent>
          <div className="flex justify-center content-center gap-2">
            <div className="text-3xl/6 font-medium text-right w-50">
              {awayTeamLog.score}
              <div className="pt-2 text-base">
                <TeamLink team={awayTeamLog.team} />
              </div>
            </div>
            <div className="text-sm/6">vs</div>
            <div className="text-3xl/6 font-medium text-left w-50">
              {homeTeamLog.score}
              <div className="pt-2 text-base">
                <TeamLink team={homeTeamLog.team} />
              </div>
            </div>
          </div>
          <div>
            <GameScore game={game} />
          </div>
        </CardContent>
        <CardFooter className="border-t-gray-200 flex justify-center gap-2">
          <GameLink game={game} />
        </CardFooter>
      </Card>
    </Fragment>
  );
}
