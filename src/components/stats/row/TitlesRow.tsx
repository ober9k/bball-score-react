import type { ReactNode } from "react";

type TitlesRowProps = {
  children?: ReactNode,
}

export default function TitlesRow({ children }: TitlesRowProps) {
  return (
    <>
      <th className={"px-4 py-2 text-left text-sm border-r-1 border-gray-300"}>{children}</th>
      <th className={"p-2 text-sm w-14 text-center"}>PTS</th>
      <th className={"p-2 text-sm w-14 text-center"}>REB</th>
      <th className={"p-2 text-sm w-14 text-center"}>AST</th>
      <th className={"p-2 text-sm w-14 text-center hidden sm:table-cell"}>STL</th>
      <th className={"p-2 text-sm w-14 text-center hidden sm:table-cell"}>BLK</th>
      <th className={"p-2 text-sm w-14 text-center hidden sm:table-cell"}>TOS</th>
      <th className={"p-2 text-sm w-14 text-center hidden sm:table-cell"}>PFS</th>
    </>
  )
}
