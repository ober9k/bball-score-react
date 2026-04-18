import * as styles from "@/components/stats/stats-values-row.module.css";
import { formatValue } from "@/lib/stats-utils.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { TableCell, TableRow } from "@/shared/components/ui/table.tsx";
import type { Player } from "@/types/player.ts";
import type { Stats } from "@/types/stats.ts";
import { StatsKey, type StatsKeyType } from "@/types/stats.ts";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

export type StatsValueCellProps = {
  stats:     Stats,
  statsKey:  StatsKeyType,
  averages?: boolean,
};

export function StatsValueCell(props: StatsValueCellProps) {
  const { stats, statsKey, averages = false } = props;

  const cellClass = ([StatsKey.Points].includes(statsKey))
    ? styles.statsLabelCell
    : styles.statsValueCell;

  const cellValue = (averages)
    ? formatValue(stats, statsKey, 1) /* 1 decimal point for averages */
    : formatValue(stats, statsKey);

  return (
    <Fragment>
      <TableCell className={cellClass}>{cellValue}</TableCell>
    </Fragment>
  );
}

type StatsValuesRowProps = {
  player?:   Player,
  played?:   number,
  totals?:   boolean,
  averages?: boolean,
  stats:     Stats,
};

export function StatsValuesRow(props: StatsValuesRowProps) {
  const { player, totals, averages = false, stats } = props;

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
            <TableCell className={styles.statsValueCell} colSpan={99}>DNP &ndash; DID NOT PLAY</TableCell>
          </Fragment>
        ) : (
          <Fragment>
            <StatsValueCell stats={stats} statsKey={StatsKey.Minutes} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.FieldGoals} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.ThreePointFieldGoals} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.FreeThrows} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.Rebounds} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.Assists} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.Steals} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.Blocks} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.Turnovers} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.PersonalFouls} averages={averages} />
            <StatsValueCell stats={stats} statsKey={StatsKey.Points} averages={averages} />
          </Fragment>
        )}
      </TableRow>
    </Fragment>
  );
}
