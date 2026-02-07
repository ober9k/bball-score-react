import type { ReactNode } from "react";
import type { Averages } from "../../../types/stats/Averages.ts";

type AveragesRowProps = {
  children?: ReactNode,
  averages: Averages,
  headings?: boolean,
}

function format(value: number): string {
  return value.toFixed(1);
}

export default function AveragesRow(props: AveragesRowProps) {
  const { averages, headings = false } = props;

  return (
    <>
      {headings ? (
        <>
          <th className={"px-4 py-2 text-left text-sm border-r-1 border-gray-200"}>{props.children}</th>
          <th className={"p-2 text-sm"}>{format(averages.points)}</th>
          <th className={"p-2 text-sm"}>{format(averages.rebounds)}</th>
          <th className={"p-2 text-sm"}>{format(averages.assists)}</th>
          <th className={"p-2 text-sm hidden sm:table-cell"}>{format(averages.steals)}</th>
          <th className={"p-2 text-sm hidden sm:table-cell"}>{format(averages.blocks)}</th>
          <th className={"p-2 text-sm hidden sm:table-cell"}>{format(averages.turnovers)}</th>
          <th className={"p-2 text-sm hidden sm:table-cell"}>{format(averages.personalFouls)}</th>
        </>
      ) : (
        <>
          <td className={"px-4 py-2 text-left text-sm border-r-1 border-gray-200"}>{props.children}</td>
          <td className={"p-2 text-sm"}>{format(averages.points)}</td>
          <td className={"p-2 text-sm"}>{format(averages.rebounds)}</td>
          <td className={"p-2 text-sm"}>{format(averages.assists)}</td>
          <td className={"p-2 text-sm hidden sm:table-cell"}>{format(averages.steals)}</td>
          <td className={"p-2 text-sm hidden sm:table-cell"}>{format(averages.blocks)}</td>
          <td className={"p-2 text-sm hidden sm:table-cell"}>{format(averages.turnovers)}</td>
          <td className={"p-2 text-sm hidden sm:table-cell"}>{format(averages.personalFouls)}</td>
        </>
      )}
    </>
  )
}
