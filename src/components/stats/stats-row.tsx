import * as styles from "@/components/stats/stats-row.module.css";
import { formatMinutes } from "@/lib/stats-utils.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { TableCell, TableRow } from "@/shared/components/ui/table.tsx";
import type { Player } from "@/types/player.ts";
import type { Stats } from "@/types/stats.ts";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

type Props = {
  player?: Player,
  totals?: boolean,
  stats:   Stats,
};

function StatsCell() {}

export function StatsRow(props: Props) {
  const { player, totals, stats } = props;

  return (
    <Fragment>
      <TableRow>
        <TableCell className="font-medium">
          {player && (
            <Link to={leaguePaths.Players.View} params={{ playerId: player.id }}>
              {player.name}
            </Link>
          )}
          {totals && ("Totals")}
        </TableCell>
        {(player && stats.seconds === 0) ? (
          <Fragment>
            <TableCell className={styles.statsCell} colSpan={11}>DNP &ndash; DID NOT PLAY</TableCell>
          </Fragment>
        ) : (
          <Fragment>
            <TableCell className={styles.statsCell}>
              {player && formatMinutes(stats.seconds)}
            </TableCell>
            <TableCell className={styles.statsCell}>{stats.fgMade}-{stats.fgAttempted}</TableCell>
            <TableCell className={styles.statsCell}>{stats.fg3Made}-{stats.fg3Attempted}</TableCell>
            <TableCell className={styles.statsCell}>{stats.ftMade}-{stats.ftAttempted}</TableCell>
            <TableCell className={styles.statsCell}>{stats.rebounds}</TableCell>
            <TableCell className={styles.statsCell}>{stats.assists}</TableCell>
            <TableCell className={styles.statsCell}>{stats.steals}</TableCell>
            <TableCell className={styles.statsCell}>{stats.blocks}</TableCell>
            <TableCell className={styles.statsCell}>{stats.turnovers}</TableCell>
            <TableCell className={styles.statsCell}>{stats.personalFouls}</TableCell>
            <TableCell className={styles.statsCell}>
              <strong className="font-medium">{stats.points}</strong>
            </TableCell>
          </Fragment>
        )}
      </TableRow>
    </Fragment>
  );
}
