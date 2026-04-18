import { StatsTitleCell } from "@/components/stats/stats-row.tsx";
import type { ColumnsType } from "@/lib/stats-utils.ts";
import { ColumnsMap } from "@/lib/stats-utils.ts";
import { TableHead, TableRow } from "@/shared/components/ui/table.tsx";
import { Fragment } from "react";

type Props = {
  columnsType?: ColumnsType,
};

export function StatsTitlesRow(props: Props) {
  const { columnsType = "complete" } = props;
  const columns = ColumnsMap.get(columnsType);

  return (
    <Fragment>
      <TableRow>
        <TableHead>...</TableHead>
        {columns.map((column) => (
          <StatsTitleCell key={column} statsKey={column} />
        ))}
      </TableRow>
    </Fragment>
  );
}
