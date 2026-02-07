import type { ReactNode } from "react";
import type { Totals } from "../../../types/stats/Totals.ts";

type TotalsRowProps = {
  children?: ReactNode,
  totals: Totals,
  headings?: boolean,
}

export default function TotalsRow(props: TotalsRowProps) {
  const { totals, headings = false } = props;

  return (
    <>
      {headings ? (
        <>
          <th className={"px-4 py-2 text-left text-sm border-r-1 border-gray-200"}>{props.children}</th>
          <th className={"p-2 text-sm"}>{totals.points}</th>
          <th className={"p-2 text-sm"}>{totals.rebounds}</th>
          <th className={"p-2 text-sm"}>{totals.assists}</th>
          <th className={"p-2 text-sm hidden sm:table-cell"}>{totals.steals}</th>
          <th className={"p-2 text-sm hidden sm:table-cell"}>{totals.blocks}</th>
          <th className={"p-2 text-sm hidden sm:table-cell"}>{totals.turnovers}</th>
          <th className={"p-2 text-sm hidden sm:table-cell"}>{totals.personalFouls}</th>
        </>
      ) : (
        <>
          <td className={"px-4 py-2 text-left text-sm border-r-1 border-gray-200"}>{props.children}</td>
          <td className={"p-2 text-sm"}>{totals.points}</td>
          <td className={"p-2 text-sm"}>{totals.rebounds}</td>
          <td className={"p-2 text-sm"}>{totals.assists}</td>
          <td className={"p-2 text-sm hidden sm:table-cell"}>{totals.steals}</td>
          <td className={"p-2 text-sm hidden sm:table-cell"}>{totals.blocks}</td>
          <td className={"p-2 text-sm hidden sm:table-cell"}>{totals.turnovers}</td>
          <td className={"p-2 text-sm hidden sm:table-cell"}>{totals.personalFouls}</td>
        </>
      )}
    </>
  )
}
