import * as styles from "@/components/stats/stats-row.module.css";
import { formatValue } from "@/lib/stats-utils.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { TableCell, TableRow } from "@/shared/components/ui/table.tsx";
import type { Player } from "@/types/player.ts";
import type { Stats } from "@/types/stats.ts";
import { StatsKey, type StatsKeyType } from "@/types/stats.ts";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

type StatsCellProps = {
  stats:    Stats,
  statsKey: StatsKeyType,
}

function StatsCell(props: StatsCellProps) {
  const { stats, statsKey } = props;

  const cellClass = (statsKey === StatsKey.Points)
    ? styles.statsTitleCell
    : styles.statsCell;

  const cellValue = formatValue(stats, statsKey);

  return (
    <Fragment>
      <TableCell className={cellClass}>{cellValue}</TableCell>
    </Fragment>
  );
}

type StatsRowProps = {
  player?: Player,
  totals?: boolean,
  stats:   Stats,
};

export function StatsRow(props: StatsRowProps) {
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
            <StatsCell stats={stats} statsKey={StatsKey.Minutes} />
            <StatsCell stats={stats} statsKey={StatsKey.FieldGoals} />
            <StatsCell stats={stats} statsKey={StatsKey.ThreePointFieldGoals} />
            <StatsCell stats={stats} statsKey={StatsKey.FreeThrows} />
            <StatsCell stats={stats} statsKey={StatsKey.Rebounds} />
            <StatsCell stats={stats} statsKey={StatsKey.Assists} />
            <StatsCell stats={stats} statsKey={StatsKey.Steals} />
            <StatsCell stats={stats} statsKey={StatsKey.Blocks} />
            <StatsCell stats={stats} statsKey={StatsKey.Turnovers} />
            <StatsCell stats={stats} statsKey={StatsKey.PersonalFouls} />
            <StatsCell stats={stats} statsKey={StatsKey.Points} />
          </Fragment>
        )}
      </TableRow>
    </Fragment>
  );
}
