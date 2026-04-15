import { leaguePaths } from "@/routes/league/routes.ts";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card.tsx";
import type { Game } from "@/types/game.ts";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

type Props = {
  game: Game,
}

export default function GameCard({ game }: Props) {

  /* this should later check the actual flag */
  const [ awayTeamLog, homeTeamLog ] = game.teamLogs;

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
                {awayTeamLog.team.name}
              </div>
            </div>
            <div className="text-sm/6">vs</div>
            <div className="text-3xl/6 font-medium text-left w-50">
              {homeTeamLog.score}
              <div className="pt-2 text-base">
                {homeTeamLog.team.name}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t-gray-200 flex justify-center gap-2">
          <Link to={leaguePaths.Games.View} params={{ gameId: game.id }}>
            ...
          </Link>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
