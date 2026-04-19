import { getPoints, getPointsDiff, getWinPercent } from "@/lib/standings-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StandingsLog } from "@/types/standings-log.ts";
import { Fragment } from "react";

type StandingsTableProps = {
  standingsLogs: StandingsLog[],
}

export function StandingsTable(props: StandingsTableProps) {
  const { standingsLogs } = props;

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-0.5 text-[13px] font-medium">...</TableHead>
            <TableHead className="px-0.5 text-[13px] text-center w-[40px]">GP</TableHead>
            <TableHead className="px-0.5 text-[13px] text-center w-[40px]">W</TableHead>
            <TableHead className="px-0.5 text-[13px] text-center w-[40px]">L</TableHead>
            <TableHead className="px-0.5 text-[13px] text-center w-[40px]">D</TableHead>
            <TableHead className="px-0.5 text-[13px] text-center w-[40px]">B</TableHead>
            <TableHead className="px-0.5 text-[13px] text-center w-[48px]">WIN%</TableHead>
            <TableHead className="px-0.5 text-[13px] text-center w-[40px]">DIFF</TableHead>
            <TableHead className="px-0.5 text-[13px] text-center w-[40px]">PTS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standingsLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="px-0.5 text-[13px] font-medium">{log.team.name}</TableCell>
              <TableCell className="px-0.5 text-[13px] text-center">{log.played}</TableCell>
              <TableCell className="px-0.5 text-[13px] text-center">{log.wins}</TableCell>
              <TableCell className="px-0.5 text-[13px] text-center">{log.losses}</TableCell>
              <TableCell className="px-0.5 text-[13px] text-center">{log.draws}</TableCell>
              <TableCell className="px-0.5 text-[13px] text-center">{log.byes}</TableCell>
              <TableCell className="px-0.5 text-[13px] text-center">{getWinPercent(log)}</TableCell>
              <TableCell className="px-0.5 text-[13px] text-center">{getPointsDiff(log)}</TableCell>
              <TableCell className="px-0.5 text-[13px] text-center">{getPoints(log)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
