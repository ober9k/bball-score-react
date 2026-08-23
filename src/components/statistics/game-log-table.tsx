import * as styles from "@/components/standings/standings-table.module.css";
import { StatsTitleCell } from "@/components/stats/stats-titles-row.tsx";
import { StatsValueCell } from "@/components/stats/stats-values-row.tsx";
import { formatYM } from "@/lib/date-utils.ts";
import { ColumnsMap, type ColumnsType } from "@/lib/stats-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import { Fragment } from "react";
import GameOutcome from "@/components/games/game-outcome";
import type { GameLog } from "@/types/game-log";

type GameLogTableProps = {
  columnsType?:  ColumnsType,
  statisticsLogs: StatisticsLog[],
  averages?: boolean,
}

export function GameLogTable(props: GameLogTableProps) {
  const { columnsType = "complete", statisticsLogs, averages } = props;
  const columns = ColumnsMap.get(columnsType)!; /* todo: revisit strict/null checks for columns */

  const getTeams = (log: StatisticsLog) => {
    const player = log.player;

    /* fix optional chaining and null checks */
    const [ playerTeam, opposingTeam ] = log.game!.teamLogs.sort((teamA, teamB) => {
      if (teamA.playerLogs.map((pl) => pl.player.id).includes(player.id)) return -1;
      if (teamB.playerLogs.map((pl) => pl.player.id).includes(player.id)) return 1;
      return 0;
    });

    return { playerTeam, opposingTeam };
  }

  const gameLogs = statisticsLogs.map((log) => {
    const { playerTeam, opposingTeam } = getTeams(log);
    const { stats } = log;
    const { id, date } = log.game!;

    return { id, date, stats, playerTeam, opposingTeam } as GameLog;
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
            <TableRow key={log.id}>
              {log.id && (
                <TableCell className={styles.statsLabelColumn}>
                  <span>{formatYM(log.date)}</span>:&nbsp;
                  <span className="font-normal">vs {log.opposingTeam.team.shortName}</span>&nbsp;
                  <GameOutcome playerTeamScore={log.playerTeam.score} opposingTeamScore={log.opposingTeam.score} />
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
