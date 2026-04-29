import { PlayerLink } from "@/components/shared/links.tsx";
import * as styles from "@/components/standings/standings-table.module.css";
import { StatsTitleCell } from "@/components/stats/stats-titles-row.tsx";
import { StatsValueCell } from "@/components/stats/stats-values-row.tsx";
import { ColumnsMap, type ColumnsType } from "@/lib/stats-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import { StatsKey, type StatsKeyType } from "@/types/stats.ts";
import { Fragment, useEffect, useState } from "react";

type StatisticsTableProps = {
  columnsType?:  ColumnsType,
  statisticsLogs: StatisticsLog[],
  averages?: boolean,
}

export function StatisticsTable(props: StatisticsTableProps) {
  const { columnsType = "complete", statisticsLogs, averages } = props;
  const columns = ColumnsMap.get(columnsType)!; /* todo: revisit strict/null checks for columns */

  const [ sortStatsKey, setSortStatsKey ] = useState<StatsKeyType>(StatsKey.Points);
  const [ sortedStatisticsLogs, setSortedStatisticsLogs ] = useState(statisticsLogs);

  useEffect(() => {
    setSortedStatisticsLogs(
      [...statisticsLogs.sort((sla, slb) => {
        let a, b;
        const [ statsA, statsB ] = [ sla.stats, slb.stats ];

        switch (sortStatsKey) {
          case StatsKey.FieldGoalsPercentage:
            a = statsA.fgMade / statsA.fgAttempted;
            b = statsB.fgMade / statsB.fgAttempted;
            break;
          case StatsKey.TwoPointFieldGoalsPercentage:
            a = statsA.fg3Made / statsA.fg3Attempted;
            b = statsB.fg3Made / statsB.fg3Attempted;
            break;
          case StatsKey.FreeThrowsPercentage:
            a = statsA.ftMade / statsA.ftAttempted;
            b = statsB.ftMade / statsB.ftAttempted;
            break;
          default:
            a = statsA[sortStatsKey].toFixed(averages);
            b = statsB[sortStatsKey].toFixed(averages);
            break;
        }

        if (a < b) return  1;
        if (a > b) return -1;
        return 0;
      })]
    );
  }, [sortStatsKey]);

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.statsLabelColumn}>&nbsp;</TableHead>
            {columns.map((column) => (
              <StatsTitleCell key={column} statsKey={column} sortStatsKey={sortStatsKey} setSortStatsKey={setSortStatsKey}/>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStatisticsLogs.map((log) => (
            <TableRow key={log.id}>
              {log.season && (
                <TableCell className={styles.statsLabelColumn}>
                  <span>{log.season.name}</span>
                </TableCell>
              )}
              {!log.season && log.player && (
                <TableCell className={styles.statsLabelColumn}>
                  <PlayerLink player={log.player} />
                </TableCell>
              )}
              {columns.map((column) => (
                <StatsValueCell key={column} stats={log.stats} statsKey={column} averages={averages} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
