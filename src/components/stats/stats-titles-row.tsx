import * as styles from "@/components/stats/stats-titles-row.module.css";
import type { ColumnsType } from "@/lib/stats-utils.ts";
import { ColumnsMap, getStatsTitle } from "@/lib/stats-utils.ts";
import { TableHead, TableRow } from "@/shared/components/ui/table.tsx";
import type { StatsKeyType } from "@/types/stats.ts";
import { StatsKey } from "@/types/stats.ts";
import { Fragment } from "react";

type StatsTitleCellProps = {
  statsKey: StatsKeyType,
};

const WidenedColumns = [
  StatsKey.FieldGoals,
  StatsKey.TwoPointFieldGoals,
  StatsKey.ThreePointFieldGoals,
  StatsKey.FreeThrows,
] as const;

export function StatsTitleCell(props: StatsTitleCellProps) {
  const { statsKey } = props;

  const cellClass = (WidenedColumns.includes(statsKey))
    ? styles.statsWidenedColumn
    : styles.statsColumn;

  const cellValue = getStatsTitle(statsKey);

  return (
    <Fragment>
      <TableHead className={cellClass}>{cellValue}</TableHead>
    </Fragment>
  );
}

type StatsTitlesRowProps = {
  columnsType?: ColumnsType,
};

export function StatsTitlesRow(props: StatsTitlesRowProps) {
  const { columnsType = "complete" } = props;
  const columns = ColumnsMap.get(columnsType);

  return (
    <Fragment>
      <TableRow>
        <TableHead>...</TableHead>
        {columns.map((column) => (
          <StatsTitleCell key={column} statsKey={column} />
        ))}
      </TableRow>
    </Fragment>
  );
}
