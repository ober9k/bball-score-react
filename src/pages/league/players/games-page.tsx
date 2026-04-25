import type { PlayerLoaderProps } from "@/apis/loaders/types.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function GamesPage() {
  const { player }: PlayerLoaderProps = getRouteApi(leaguePaths.Players.Games).useLoaderData();

  useTitle("Games", player.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Players", to: leaguePaths.Players.Index },
    { title: player.name + " Games" },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        {player.name} #{player.number}
      </p>
    </>
  );
}

export { GamesPage as PlayersGamesPage };
