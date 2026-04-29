import { PlayerLink } from "@/components/shared/links.tsx";
import * as styles from "@/components/stats/stats-values-row.module.css";
import { ColumnsMap, type ColumnsType, formatValue } from "@/lib/stats-utils.ts";
import { TableCell, TableRow } from "@/shared/components/ui/table.tsx";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { Stats } from "@/types/stats.ts";
import { StatsKey, type StatsKeyType } from "@/types/stats.ts";
import { Fragment } from "react";

const LabelCells: StatsKeyType[] = [
  StatsKey.Points,
];

export type StatsValueCellProps = {
  stats:     Stats,
  statsKey:  StatsKeyType,
  averages?: boolean,
};

export function StatsValueCell(props: StatsValueCellProps) {
  const { stats, statsKey, averages = false } = props;

  const cellClass = (LabelCells.includes(statsKey))
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
  columnsType?: ColumnsType,
  player?:   Player,
  season?:   Season,
  played?:   number,
  totals?:   boolean,
  averages?: boolean,
  stats:     Stats,
};

export function StatsValuesRow(props: StatsValuesRowProps) {
  const { columnsType = "complete", player, season, totals, averages = false, stats } = props;
  const columns = ColumnsMap.get(columnsType);

  return (
    <Fragment>
      <TableRow>
        <TableCell className="font-medium">
          {player && (
            <PlayerLink player={player} />
          )}
          {season && (
            <span>{season.name}</span>
          )}
          {totals && ("Totals")}
        </TableCell>
        {(player && stats.seconds === 0) ? (
          <Fragment>
            <TableCell className={styles.statsValueCell} colSpan={99}>DNP &ndash; DID NOT PLAY</TableCell>
          </Fragment>
        ) : (
          <Fragment>
            {columns.map((column) => (
              <StatsValueCell key={column} stats={stats} statsKey={column} averages={averages} />
            ))}
          </Fragment>
        )}
      </TableRow>
    </Fragment>
  );
}
