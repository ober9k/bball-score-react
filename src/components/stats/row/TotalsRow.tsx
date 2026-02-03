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
          <th className={"p-1 text-left text-sm"}>{props.children}</th>
          <th className={"p-1 text-sm"}>{totals.points}</th>
          <th className={"p-1 text-sm"}>{totals.rebounds}</th>
          <th className={"p-1 text-sm"}>{totals.assists}</th>
        </>
      ) : (
        <>
          <td className={"p-1 text-left text-sm"}>{props.children}</td>
          <td className={"p-1 text-sm"}>{totals.points}</td>
          <td className={"p-1 text-sm"}>{totals.rebounds}</td>
          <td className={"p-1 text-sm"}>{totals.assists}</td>
        </>
      )}
    </>
  )
}
