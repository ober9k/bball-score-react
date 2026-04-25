import type { PlayersLoaderProps } from "@/apis/loaders/types.ts";
import PlayerCard from "@/components/players/player-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import { getRouteApi } from "@tanstack/react-router";

export function IndexPage() {
  const { players, statisticsLogs }: PlayersLoaderProps = getRouteApi(leaguePaths.Players.Index).useLoaderData();

  useTitle("Players");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Players" },
  ]);

  /* todo: optimize */
  const playerStats = new Map<number, StatisticsLog>();
  statisticsLogs.forEach((log) => {
    playerStats.set(log.player.id, log.stats);
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} stats={playerStats.get(player.id)} />
        ))}
      </div>
    </>
  );
}

export { IndexPage as PlayersIndexPage };
