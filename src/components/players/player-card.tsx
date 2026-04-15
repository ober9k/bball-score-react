import { PlayerPosition } from "@/components/players/player-position.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { Player } from "@/types/player.ts";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

type Props = {
  player: Player,
};

export default function PlayerCard({ player }: Props) {
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>
            <Link to={leaguePaths.Players.View} params={{ playerId: player.id }}>
              {player.name} #{player.number}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerPosition player={player} />
        </CardContent>
        <CardFooter className="border-t-gray-200 flex justify-center gap-2">
          <div>0.0 PTS</div>
          <div>0.0 REB</div>
          <div>0.0 AST</div>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
