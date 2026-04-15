import type { PlayersLoaderProps } from "@/apis/loaders/types.ts";
import PlayerCard from "@/components/players/player-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function IndexPage() {
  const { players }: PlayersLoaderProps = getRouteApi(leaguePaths.Players.Index).useLoaderData();

  useTitle("Players");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Players" },
  ]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {players.map((player) => (
          <PlayerCard player={player} key={player.id} />
        ))}
      </div>
    </>
  );
}

export { IndexPage as PlayersIndexPage };
