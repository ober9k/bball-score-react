import type { PlayerGamesLoaderProps, PlayerLoaderProps } from "@/apis/loaders/types.ts";
import { PlayerMenu } from "@/components/players/player-menu.tsx";
import { GameLogTable } from "@/components/statistics/game-log-table.tsx";
import { StatisticsTable } from "@/components/statistics/statistics-table.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function GamesPage() {
  const { player, gamesStatisticsLogs }: PlayerGamesLoaderProps = getRouteApi(leaguePaths.Players.Games).useLoaderData();

  useTitle("Games", player.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Players", to: leaguePaths.Players.Index },
    { title: player.name + " Games" },
  ]);

  return (
    <>
      <PlayerMenu player={player} />
      <h3 className={"py-1 border-b-1 border-b-gray-700"}>Game Log</h3>
      <GameLogTable statisticsLogs={gamesStatisticsLogs} />
    </>
  );
}

export { GamesPage as PlayersGamesPage };
