import { ColumnsMap, type ColumnsType, formatPoints, formatPointsDiff, formatValue, formatWinPercent, getStandingsTitle } from "@/lib/standings-utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { StandingsLog } from "@/types/standings-log.ts";
import { Fragment } from "react";

type StandingsTableProps = {
  columnsType?:  ColumnsType,
  standingsLogs: StandingsLog[],
}

export function StandingsTable(props: StandingsTableProps) {
  const { columnsType = "complete", standingsLogs } = props;
  const columns = ColumnsMap.get(columnsType);

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-0.5 text-[13px] font-medium">...</TableHead>
            {columns.map((column) => (
              <TableHead key={column} className="px-0.5 text-[13px] text-center w-[40px]">{getStandingsTitle(column)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {standingsLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="px-0.5 text-[13px] font-medium">{log.team.name}</TableCell>
              {columns.map((column) => (
                <TableCell key={column} className="px-0.5 text-[13px] text-center">{formatValue(log, column)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
