import * as styles from "@/components/standings/standings-table.module.css";
import { StatsTitleCell } from "@/components/stats/stats-titles-row.tsx";
import { StatsValueCell } from "@/components/stats/stats-values-row.tsx";
import { formatYM } from "@/lib/date-utils.ts";
import { ColumnsMap, type ColumnsType } from "@/lib/stats-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import { Fragment } from "react";
import GameOutcome from "@/components/games/game-outcome";

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

    const playerTeamName    = playerTeam!.team.shortName;   /* temp */
    const opposingTeamName  = opposingTeam!.team.shortName; /* temp */
    const playerTeamScore   = playerTeam!.score;   /* temp */
    const opposingTeamScore = opposingTeam!.score; /* temp */

    /* this is filthy and expensive, but will rework into a separate component */
    return {
      /* todo: revisit strict/null checks for teams */
      playerTeamName,
      opposingTeamName, 
      playerTeamScore, 
      opposingTeamScore,
    };
  };

  const gameLogs = statisticsLogs.map((log) => {
    const opposingTeam = getOpposingTeam(log);
    const date = formatYM(log.game!.date); /* todo: revisit strict/null checks for log/game */

    return {
      game: log.game,
      stats: log.stats,
      date,
      ...opposingTeam,
    };
  });

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
          {gameLogs.map((log) => (
            <TableRow key={log.game!.id}>
              {log.game && (
                <TableCell className={styles.statsLabelColumn}>
                  <span>{log.date}</span>:&nbsp;
                  <span className="font-normal">vs {log.opposingTeamName}</span>&nbsp;
                  <GameOutcome playerTeamScore={log.playerTeamScore} opposingTeamScore={log.opposingTeamScore} />
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
