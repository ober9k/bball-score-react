import type { StandingsLoaderProps } from "@/apis/loaders/types.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import { getRouteApi } from "@tanstack/react-router";

export function StandingsPage() {
  const { standings: standingsLogs }: StandingsLoaderProps = getRouteApi(leaguePaths.League.Standings).useLoaderData();

  useTitle("Standings");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Standings" },
  ]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team</TableHead>
            <TableHead>W</TableHead>
            <TableHead>L</TableHead>
            <TableHead>D</TableHead>
            <TableHead>B</TableHead>
            <TableHead>PF</TableHead>
            <TableHead>PA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standingsLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.team.name}</TableCell>
            <TableCell>{log.wins}</TableCell>
            <TableCell>{log.losses}</TableCell>
            <TableCell>{log.draws}</TableCell>
            <TableCell>{log.byes}</TableCell>
            <TableCell>{log.pointsFor}</TableCell>
            <TableCell>{log.pointsAgainst}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export { StandingsPage as LeagueStandingsPage };
