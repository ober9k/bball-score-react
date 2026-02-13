import type { ReactNode } from "react";

type TitlesRowWithSortProps = {
  children?: ReactNode,
  sort: string,
  setSort: (sort: string) => void,
}

export default function TitlesRowWithSort({ children, sort, setSort }: TitlesRowWithSortProps) {
  const handleSort = (sort: string) => {
    setSort(sort);
  }

  const isSelectedSort = (selectedSort: string) => {
    return sort === selectedSort;
  }

  return (
    <>
      <th className={"px-4 py-2 text-left text-sm border-r-1 border-gray-300"}>{children}</th>
      <th className={"p-2 text-sm w-14 whitespace-nowrap"}>
        <a className={"cursor-pointer"} onClick={() => handleSort('points')}>PTS</a>
        {isSelectedSort('points') && <small className={"text-xs inline-block pt-0.25 pl-0.5 absolute"}>▼</small>}
      </th>
      <th className={"p-2 text-sm w-14"}>
        <a className={"cursor-pointer"} onClick={() => handleSort('rebounds')}>REB</a>
        {isSelectedSort('rebounds') && <small className={"text-xs inline-block pt-0.25 pl-0.5 absolute"}>▼</small>}
      </th>
      <th className={"p-2 text-sm w-14"}>
        <a className={"cursor-pointer"} onClick={() => handleSort('assists')}>AST</a>
        {isSelectedSort('assists') && <small className={"text-xs inline-block pt-0.25 pl-0.5 absolute"}>▼</small>}
      </th>
      <th className={"p-2 text-sm w-14 hidden sm:table-cell"}>
        <a className={"cursor-pointer"} onClick={() => handleSort('steals')}>STL</a>
        {isSelectedSort('steals') && <small className={"text-xs inline-block pt-0.25 pl-0.5 absolute"}>▼</small>}
      </th>
      <th className={"p-2 text-sm w-14 hidden sm:table-cell"}>
        <a className={"cursor-pointer"} onClick={() => handleSort('blocks')}>BLK</a>
        {isSelectedSort('blocks') && <small className={"text-xs inline-block pt-0.25 pl-0.5 absolute"}>▼</small>}
      </th>
      <th className={"p-2 text-sm w-14 hidden sm:table-cell"}>
        <a className={"cursor-pointer"} onClick={() => handleSort('turnovers')}>TOS</a>
        {isSelectedSort('turnovers') && <small className={"text-xs inline-block pt-0.25 pl-0.5 absolute"}>▼</small>}
      </th>
      <th className={"p-2 text-sm w-14 hidden sm:table-cell"}>
        <a className={"cursor-pointer"} onClick={() => handleSort('personalFouls')}>PFS</a>
        {isSelectedSort('personalFouls') && <small className={"text-xs inline-block pt-0.25 pl-0.5 absolute"}>▼</small>}
      </th>
    </>
  )
}
