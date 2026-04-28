import * as styles from "@/components/players/player-card.module.css";
import { PlayerPosition } from "@/components/players/player-position.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { Player } from "@/types/player.ts";
import type { Stats } from "@/types/stats.ts";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

type Props = {
  player: Player,
  stats?: Stats,
};

export default function PlayerCard({ player, stats }: Props) {

  const [ points, rebounds, assists ] = [ stats?.points, stats?.rebounds, stats?.assists ]
    .map((value) => value || 0)
    .map((value) => value.toFixed(1));

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
        <CardFooter className={styles.footer}>
          <div className={styles.stats}>
            <div>
              <span className={styles.statsValue}>{points}</span>
              <span className={styles.statsTitle}>Points</span>
            </div>
            <div>
              <span className={styles.statsValue}>{rebounds}</span>
              <span className={styles.statsTitle}>Rebounds</span>
            </div>
            <div>
              <span className={styles.statsValue}>{assists}</span>
              <span className={styles.statsTitle}>Assists</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
