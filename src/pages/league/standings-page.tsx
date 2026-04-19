import type { StandingsLoaderProps } from "@/apis/loaders/types.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StandingsLog } from "@/types/standings-log.ts";
import { getRouteApi } from "@tanstack/react-router";

function getPointsDiff(log: StandingsLog): string {
  const diff = ((log.pointsFor - log.pointsAgainst) / log.played);
  const diffValue = diff.toFixed(1);

  return (diff > 0)
    ? `+${diffValue}`
    : diffValue;
}

function getPoints(log: StandingsLog): number {
  return (log.wins * 3) + (log.draws * 2) + (log.losses) + (log.byes);
}

export function StandingsPage() {
  const { standings }: StandingsLoaderProps = getRouteApi(leaguePaths.League.Standings).useLoaderData();

  useTitle("Standings");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Standings" },
  ]);

  const standingsLogs = standings.sort((logA: StandingsLog, logB: StandingsLog) => {
    const pointsA = getPoints(logA);
    const pointsB = getPoints(logB);

    if (pointsA < pointsB) return  1;
    if (pointsA > pointsB) return -1;
    return 0;
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team</TableHead>
            <TableHead>GP</TableHead>
            <TableHead>W</TableHead>
            <TableHead>L</TableHead>
            <TableHead>D</TableHead>
            <TableHead>B</TableHead>
            <TableHead>DIFF</TableHead>
            <TableHead>PTS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standingsLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.team.name}</TableCell>
            <TableCell>{log.played}</TableCell>
            <TableCell>{log.wins}</TableCell>
            <TableCell>{log.losses}</TableCell>
            <TableCell>{log.draws}</TableCell>
            <TableCell>{log.byes}</TableCell>
            <TableCell>{getPointsDiff(log)}</TableCell>
            <TableCell>{getPoints(log)}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { StandingsPage as LeagueStandingsPage };
