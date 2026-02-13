import type { ReactNode } from "react";

type TitlesRowProps = {
  children?: ReactNode,
}

export default function TitlesRow({ children }: TitlesRowProps) {
  return (
    <>
      <th className={"px-4 py-2 text-left text-sm border-r-1 border-gray-300"}>{children}</th>
      <th className={"p-2 text-sm w-14"}>PTS</th>
      <th className={"p-2 text-sm w-14"}>REB</th>
      <th className={"p-2 text-sm w-14"}>AST</th>
      <th className={"p-2 text-sm w-14 hidden sm:table-cell"}>STL</th>
      <th className={"p-2 text-sm w-14 hidden sm:table-cell"}>BLK</th>
      <th className={"p-2 text-sm w-14 hidden sm:table-cell"}>TOS</th>
      <th className={"p-2 text-sm w-14 hidden sm:table-cell"}>PFS</th>
    </>
  )
}
