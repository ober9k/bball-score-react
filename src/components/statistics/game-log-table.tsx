import * as styles from "@/components/standings/standings-table.module.css";
import { StatsTitleCell } from "@/components/stats/stats-titles-row.tsx";
import { StatsValueCell } from "@/components/stats/stats-values-row.tsx";
import { ColumnsMap, type ColumnsType } from "@/lib/stats-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import { Fragment } from "react";

type GameLogTableProps = {
  columnsType?:  ColumnsType,
  statisticsLogs: StatisticsLog[],
  averages?: boolean,
}

export function GameLogTable(props: GameLogTableProps) {
  const { columnsType = "complete", statisticsLogs, averages } = props;
  const columns = ColumnsMap.get(columnsType);

  /* this whole thing is temp... experimenting */
  const getOpposingTeam = (log: StatisticsLog) => {
    const playerId = log.player.id;

    const playerTeam = log.game?.teamLogs
      .filter((tl) => tl.playerLogs.map((pl) => pl.player.id).includes(playerId)).pop(); /* temp */
    const opposingTeam = log.game?.teamLogs
      .filter((tl) => !tl.playerLogs.map((pl) => pl.player.id).includes(playerId)).pop(); /* temp */

    const pScore = playerTeam.score;   /* temp */
    const oScore = opposingTeam.score; /* temp */
    let outcome  = "";

    if (pScore > oScore)   outcome = "W"; /* temp */
    if (pScore < oScore)   outcome = "L"; /* temp */
    if (pScore === oScore) outcome = "D"; /* temp */

    const date = (new Intl.DateTimeFormat(navigator.language, {
      year:  "2-digit",
      month: "2-digit",
    })).format(new Date(log.game?.date));

    /* this is filthy and expensive, but will rework into a separate component */
    return {
      date, name: opposingTeam.team.shortName, outcome, pScore, oScore
    };
  };

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={styles.statsLabelColumn}>&nbsp;</TableHead>
            {columns.map((column) => (
              <StatsTitleCell key={column} statsKey={column} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {statisticsLogs.map((log) => (
            <TableRow key={log.game!.id}>
              {log.game && (
                <TableCell className={styles.statsLabelColumn}>
                  <span>{getOpposingTeam(log).date}</span>:&nbsp;
                  <span className="font-normal">vs {getOpposingTeam(log).name}</span>&nbsp;
                  <span className="font-normal">({getOpposingTeam(log).outcome} {getOpposingTeam(log).pScore}-{getOpposingTeam(log).oScore})</span>
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
