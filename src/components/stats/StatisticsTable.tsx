import { useEffect, useState } from "react";
import type { StatisticsLog } from "../../types/StatisticsLog.ts";
import PlayerLink from "../links/PlayerLink.tsx";
import AveragesRow from "./row/AveragesRow.tsx";
import TitlesRowWithSort from "./row/TitlesRowWithSort.tsx";

type StatisticsTableProps = {
  statisticsLogs: Array<StatisticsLog>,
}

function sortStatisticsByKey(sort: string) {
  return (statisticsLogA, statisticsLogB) => {
    const valueA = statisticsLogA[sort];
    const valueB = statisticsLogB[sort];

    return (valueA === valueB) ? 0 : (valueA > valueB) ?  -1 : 1;
  };
}

export default function StatisticsTable({ statisticsLogs }: StatisticsTableProps) {
  const [ sort, setSort ] = useState("points");
  const [ sortedLogs, setSortedLogs ] = useState(statisticsLogs);

  useEffect(() => {
    /* TODO: check warning for repeated effects */
    setSortedLogs([...statisticsLogs.sort(sortStatisticsByKey(sort))]);
  }, [statisticsLogs, sort])

  return (
    <div className={"statistics py-2"}>
      <table className={"w-full"}>
        <thead>
        <tr className="bg-gray-200 border-b border-gray-300">
          <TitlesRowWithSort sort={sort} setSort={setSort}/>
        </tr>
        </thead>
        <tbody>
        {sortedLogs.map((statisticsLog) => (
          <tr key={statisticsLog.id} className="even:bg-gray-100">
            <AveragesRow averages={statisticsLog}>
              <PlayerLink player={statisticsLog.player}/>
            </AveragesRow>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
