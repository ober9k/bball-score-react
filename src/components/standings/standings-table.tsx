import { TeamLink } from "@/components/shared/links.tsx";
import * as styles from "@/components/standings/standings-table.module.css";
import { ColumnsMap, type ColumnsType, formatValue, getStandingsTitle } from "@/lib/standings-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StandingsLog } from "@/types/standings-log.ts";
import { Fragment } from "react";

type StandingsTableProps = {
  columnsType?:  ColumnsType,
  standingsLogs: StandingsLog[],
}

export function StandingsTable(props: StandingsTableProps) {
  const { columnsType = "complete", standingsLogs } = props;
  const columns = ColumnsMap.get(columnsType)!; /* todo: revisit strict/null checks for columns */

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.statsLabelColumn}>&nbsp;</TableHead>
            {columns.map((column) => (
              <TableHead key={column} className={styles.statsTitleColumn}>
                {getStandingsTitle(column)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {standingsLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className={styles.statsLabelColumn}>
                <TeamLink team={log.team} />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column} className={styles.statsValueColumn}>
                  {formatValue(log, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
