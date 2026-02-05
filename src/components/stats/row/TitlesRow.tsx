import type { ReactNode } from "react";

type TitlesRowProps = {
  children?: ReactNode,
}

export default function TitlesRow(props: TitlesRowProps) {
  return (
    <>
      <th className={"px-2 py-1 text-left text-sm"}>{props.children}</th>
      <th className={"p-1 text-sm w-16"}>PTS</th>
      <th className={"p-1 text-sm w-16"}>REB</th>
      <th className={"p-1 text-sm w-16"}>AST</th>
    </>
  )
}
