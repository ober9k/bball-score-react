import * as styles from "@/components/stats/stats-titles-row.module.css";
import type { ColumnsType } from "@/lib/stats-utils.ts";
import { ColumnsMap, getStatsTitle } from "@/lib/stats-utils.ts";
import { TableHead, TableRow } from "@/shared/components/ui/table.tsx";
import type { StatsKeyType } from "@/types/stats.ts";
import { StatsKey } from "@/types/stats.ts";
import { Fragment } from "react";

const WidenedColumns: StatsKeyType[] = [
  StatsKey.FieldGoals,
  StatsKey.FieldGoalsPercentage,
  StatsKey.TwoPointFieldGoals,
  StatsKey.TwoPointFieldGoalsPercentage,
  StatsKey.ThreePointFieldGoals,
  StatsKey.ThreePointFieldGoalsPercentage,
  StatsKey.FreeThrows,
  StatsKey.FreeThrowsPercentage,
] as const;

const SortableColumns: StatsKeyType[] = [
  StatsKey.FieldGoalsPercentage,
  StatsKey.TwoPointFieldGoalsPercentage,
  StatsKey.ThreePointFieldGoalsPercentage,
  StatsKey.FreeThrowsPercentage,
  StatsKey.Rebounds,
  StatsKey.Assists,
  StatsKey.Steals,
  StatsKey.Blocks,
  StatsKey.Turnovers,
  StatsKey.PersonalFouls,
  StatsKey.Points,
] as const;

type StatsTitleCellProps = {
  statsKey: StatsKeyType,
  sortStatsKey?: StatsKeyType,
  setSortStatsKey?: (statsKey: StatsKeyType) => {},
};

export function StatsTitleCell(props: StatsTitleCellProps) {
  const { statsKey, sortStatsKey, setSortStatsKey } = props;

  const isWidenedColumn  = () => WidenedColumns.includes(statsKey);
  const isSortableColumn = () => SortableColumns.includes(statsKey);
  const isSortedColumn   = () => statsKey === sortStatsKey;

  const cellClasses = [styles.statsColumn];

  if (isWidenedColumn())  cellClasses.push(styles.statsWidenedColumn);
  if (isSortableColumn()) sortStatsKey && cellClasses.push(styles.statsClickableColumn);

  const cellValue = getStatsTitle(statsKey);
  const cellClass = cellClasses.join(" ");

  return (
    <Fragment>
      {isSortableColumn() ? (
        <TableHead className={cellClass} onClick={() => setSortStatsKey(statsKey)}>
          {cellValue}
          {isSortedColumn() && (
            <span className="px-0.25 text-xs">▼</span>
          )}
        </TableHead>
      ) : (
        <TableHead className={cellClass}>
          {cellValue}
        </TableHead>
      )}
    </Fragment>
  );
}

type StatsTitlesRowProps = {
  columnsType?: ColumnsType,
  sortStatsKey: StatsKeyType,
  setSortStatsKey: (statsKey: StatsKeyType) => {},
};

export function StatsTitlesRow(props: StatsTitlesRowProps) {
  const { columnsType = "complete", sortStatsKey, setSortStatsKey } = props;
  const columns = ColumnsMap.get(columnsType);

  return (
    <Fragment>
      <TableRow>
        <TableHead>...</TableHead>
        {columns.map((column) => (
          <StatsTitleCell key={column} statsKey={column} sortStatsKey={sortStatsKey} setSortStatsKey={setSortStatsKey} />
        ))}
      </TableRow>
    </Fragment>
  );
}
