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
          <th className={"p-1 text-left text-sm"}>{props.children}</th>
          <th className={"p-1 text-sm"}>{format(averages.points)}</th>
          <th className={"p-1 text-sm"}>{format(averages.rebounds)}</th>
          <th className={"p-1 text-sm"}>{format(averages.assists)}</th>
        </>
      ) : (
        <>
          <td className={"p-1 text-left text-sm"}>{props.children}</td>
          <td className={"p-1 text-sm"}>{format(averages.points)}</td>
          <td className={"p-1 text-sm"}>{format(averages.rebounds)}</td>
          <td className={"p-1 text-sm"}>{format(averages.assists)}</td>
        </>
      )}
    </>
  )
}
