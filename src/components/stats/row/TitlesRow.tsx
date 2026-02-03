import type { ReactNode } from "react";

type TitlesRowProps = {
  children?: ReactNode,
}

export default function TitlesRow(props: TitlesRowProps) {
  return (
    <>
      <th className={"p-1 text-left text-sm"}>{props.children}</th>
      <th className={"p-1 text-sm"}>PTS</th>
      <th className={"p-1 text-sm"}>REB</th>
      <th className={"p-1 text-sm"}>AST</th>
    </>
  )
}
