import type { PlayerLoaderProps } from "@/apis/loaders/types.ts";
import { PlayerMenu } from "@/components/players/player-menu.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function ViewPage() {
  const { player }: PlayerLoaderProps = getRouteApi(leaguePaths.Players.View).useLoaderData();

  useTitle("Player", player.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Players", to: leaguePaths.Players.Index },
    { title: player.name },
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

export { ViewPage as PlayersViewPage };
