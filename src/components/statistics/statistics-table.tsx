import { PlayerLink } from "@/components/shared/links.tsx";
import * as styles from "@/components/standings/standings-table.module.css";
import { StatsTitleCell } from "@/components/stats/stats-titles-row.tsx";
import { StatsValueCell } from "@/components/stats/stats-values-row.tsx";
import { ColumnsMap, type ColumnsType } from "@/lib/stats-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import { Fragment } from "react";

type StatisticsTableProps = {
  columnsType?:  ColumnsType,
  statisticsLogs: StatisticsLog[],
}

export function StatisticsTable(props: StatisticsTableProps) {
  const { columnsType = "complete", statisticsLogs } = props;
  const columns = ColumnsMap.get(columnsType);

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.statsLabelColumn}>&nbsp;</TableHead>
            {columns.map((column) => (
              <StatsTitleCell statsKey={column} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {statisticsLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className={styles.statsLabelColumn}>
                <PlayerLink player={log.player} />
              </TableCell>
              {columns.map((column) => (
                <StatsValueCell key={column} stats={log.stats} statsKey={column} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
