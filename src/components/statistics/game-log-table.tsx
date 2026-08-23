import * as styles from "@/components/standings/standings-table.module.css";
import { StatsTitleCell } from "@/components/stats/stats-titles-row.tsx";
import { StatsValueCell } from "@/components/stats/stats-values-row.tsx";
import { formatYM } from "@/lib/date-utils.ts";
import { deriveOutcome, mapOutcomeAbbreviation } from "@/lib/game-utils";
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
  const columns = ColumnsMap.get(columnsType)!; /* todo: revisit strict/null checks for columns */

  /* this whole thing is temp... experimenting */
  const getOpposingTeam = (log: StatisticsLog) => {
    const playerId = log.player.id;

    const playerTeam = log.game?.teamLogs
      .filter((tl) => tl.playerLogs.map((pl) => pl.player.id).includes(playerId)).pop(); /* temp */
    const opposingTeam = log.game?.teamLogs
      .filter((tl) => !tl.playerLogs.map((pl) => pl.player.id).includes(playerId)).pop(); /* temp */

    const teamScore = playerTeam!.score;   /* temp */
    const opposingTeamScore = opposingTeam!.score; /* temp */
    const outcome = deriveOutcome(teamScore, opposingTeamScore);
    const outcomeAbbreviation = mapOutcomeAbbreviation(outcome); /* temp */

    const date = formatYM(log.game!.date); /* todo: revisit strict/null checks for log/game */

    /* this is filthy and expensive, but will rework into a separate component */
    return {
      /* todo: revisit strict/null checks for teams */
      date, name: opposingTeam!.team.shortName, outcome, outcomeAbbreviation, pScore: teamScore, oScore: opposingTeamScore
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
                  <span className="font-normal">({getOpposingTeam(log).outcomeAbbreviation} {getOpposingTeam(log).pScore}-{getOpposingTeam(log).oScore})</span>
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
