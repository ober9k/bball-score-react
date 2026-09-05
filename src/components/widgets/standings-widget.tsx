import { TeamLink } from "@/components/shared/links";
import { calculatePoints, sortByPoints } from "@/lib/standings-utils";
import { leaguePaths } from "@/routes/league/routes";
import { buttonVariants } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import type { StandingsLog } from "@/types/standings-log";
import { Link } from "@tanstack/react-router";

type Props = {
  logs: StandingsLog[],
};

function StandingsWidget(props: Props) {
  const { logs } = props;
  
  const sortedLogs = logs.sort(sortByPoints);
  const viewLink = leaguePaths.League.Standings

  return (
    <>
      <article>
        <header>
          <h2>Standings</h2>
        </header>
        <section>
          <Table>
            <TableHeader>
              <TableHead className="uppercase">Team</TableHead>
              <TableHead className="w-8 text-center">GP</TableHead>
              <TableHead className="w-8 text-center">W</TableHead>
              <TableHead className="w-8 text-center">L</TableHead>
              <TableHead className="w-8 text-center">PTS</TableHead>
            </TableHeader>
            <TableBody>
              {sortedLogs.map((log, key) => (
                <TableRow key={key}>
                  <TableCell className="text-xs">
                    <TeamLink team={log.team} />
                  </TableCell>
                  <TableCell className="text-center">{log.played}</TableCell>
                  <TableCell className="text-center">{log.wins}</TableCell>
                  <TableCell className="text-center">{log.losses}</TableCell>
                  <TableCell className="text-center">{calculatePoints(log)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <footer>
          <Link to={viewLink} className={buttonVariants({ variant: "secondary", size: "xs" })}>
            View Standings
          </Link>
        </footer>
      </article>
    </>
  );
}

export default StandingsWidget;
