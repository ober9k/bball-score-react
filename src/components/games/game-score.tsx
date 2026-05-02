import * as styles from "@/components/games/game-score.module.css";
import { TeamLink } from "@/components/shared/links.tsx";
import { generateScoreTitles } from "@/lib/game-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { Game, TeamLog } from "@/types/game.ts";
import { Fragment } from "react";

type TitlesRowProps = {
  periods: number,
};

function TitlesRow(props: TitlesRowProps) {
  const titles = generateScoreTitles(props.periods);

  return (
    <Fragment>
      <TableRow>
        <TableHead>&nbsp;</TableHead>
        {titles.map((title, index) => (
          <TableHead className={styles.titleColumn} key={index}>{title}</TableHead>
        ))}
        <TableHead className={styles.titleColumn}>T</TableHead>
      </TableRow>
    </Fragment>
  );
}

type ValuesRowProps = {
  teamLog: TeamLog,
};

function ValuesRow(props: ValuesRowProps) {
  const { teamLog } = props;

  return (
    <Fragment>
      <TableRow>
        <TableCell className={styles.labelColumn}>
          <TeamLink team={teamLog.team} />
        </TableCell>
        {teamLog.byPeriod.map((score, index) => (
          <TableCell key={index} className={styles.valueColumn}>{score}</TableCell>
        ))}
        <TableCell className={styles.totalValueColumn}>{teamLog.score}</TableCell>
      </TableRow>
    </Fragment>
  );
}

type GameProps = {
  game: Game,
};

export function GameScore(props: GameProps) {
  const { game } = props;
  const { teamLogs } = game;
  const [ awayTeamLog ] = teamLogs; /* only care for first */

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TitlesRow periods={awayTeamLog.byPeriod.length} />
        </TableHeader>
        <TableBody>
          {teamLogs.map((teamLog, index) => (
            <ValuesRow teamLog={teamLog} key={index} />
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
