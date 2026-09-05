import { TeamLink } from "@/components/shared/links.tsx";
import * as styles from "@/components/standings/standings-table.module.css";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StandingsLog } from "@/types/standings-log.ts";

type DisplayType = "complete" | "compact" | "widget";

type HeaderProps = {
  display: DisplayType;
};

type BodyProps = {
  log: StandingsLog,
  display: DisplayType;
};

type Props = {
  logs: StandingsLog[],
  display?: DisplayType;
};

const isCompleteDisplay = (display: DisplayType) => display === "complete";

function ResultsHeader(props: HeaderProps) {
  const statsClass = cn(styles.headerColumn);
  const lastStatsClass = cn(styles.headerColumn, styles.headerColumnBorder);

  return (
    <>
      <TableHead className={lastStatsClass}>GP</TableHead>
      <TableHead className={statsClass}>W</TableHead>
      <TableHead className={statsClass}>L</TableHead>
      <TableHead className={statsClass}>D</TableHead>
      <TableHead className={lastStatsClass}>B</TableHead>
      <TableHead className={lastStatsClass}>PTS</TableHead>
    </>
  );
}

function ScoringHeader(props: HeaderProps) {
  const statsClass = cn(styles.headerColumn);
  const lastStatsClass = cn(styles.headerColumn, styles.headerColumnBorder);

  return (
    <>
      <TableHead className={statsClass}>PPG</TableHead>
      <TableHead className={statsClass}>oPPG</TableHead>
      <TableHead className={lastStatsClass}>DIFF</TableHead>
    </>
  );
}

function ResultsBody({ log }: BodyProps) {
  const statsClass = cn(styles.bodyColumn);
  const lastStatsClass = cn(styles.bodyColumn, styles.bodyColumnBorder);

  return (
    <>
      <TableCell className={lastStatsClass}>{log.played}</TableCell>
      <TableCell className={statsClass}>{log.wins}</TableCell>
      <TableCell className={statsClass}>{log.losses}</TableCell>
      <TableCell className={statsClass}>{log.draws}</TableCell>
      <TableCell className={lastStatsClass}>{log.byes}</TableCell>
      <TableCell className={lastStatsClass}>{log.points}</TableCell>
    </>
  );
}

function ScoringBody({ log }: BodyProps) {
  const statsClass = cn(styles.bodyColumn);
  const lastStatsClass = cn(styles.bodyColumn, styles.bodyColumnBorder);

  return (
    <>
      <TableCell className={statsClass}>10</TableCell>
      <TableCell className={statsClass}>10</TableCell>
      <TableCell className={lastStatsClass}>+10</TableCell>
    </>
  );
}

export function StandingsTable(props: Props) {
  const { logs: standingsLogs, display = "complete" } = props;

  return (
    <>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow className={styles.headerRow}>
            <TableHead className={styles.headerTitleColumn}>Team</TableHead>
            <ResultsHeader />
            {isCompleteDisplay(display) && <ScoringHeader />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {standingsLogs.map((log) => (
            <TableRow key={log.id} className={styles.bodyRow}>
              <TableCell className={styles.bodyTitleColumn}>
                <TeamLink team={log.team} />
              </TableCell>
              <ResultsBody log={log} />
              {isCompleteDisplay(display) && <ScoringBody log={log} />}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
