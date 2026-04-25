import type { PlayerLoaderProps } from "@/apis/loaders/types.ts";
import { PlayerMenu } from "@/components/players/player-menu.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function StatisticsPage() {
  const { player }: PlayerLoaderProps = getRouteApi(leaguePaths.Players.Statistics).useLoaderData();

  useTitle("Statistics", player.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Players", to: leaguePaths.Players.Index },
    { title: player.name + " Statistics" },
  ]);

  return (
    <>
      <PlayerMenu player={player} />
      <p className="p-2 text-sm">
        {player.name} #{player.number}
      </p>
    </>
  );
}

export { StatisticsPage as PlayersStatisticsPage };
