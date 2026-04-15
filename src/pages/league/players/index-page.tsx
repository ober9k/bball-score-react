import PlayerCard from "@/components/players/player-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { PlayerDataWithId } from "@/types/player.ts";
import { getRouteApi } from "@tanstack/react-router";

type LoaderProps = {
  players: PlayerDataWithId[],
}

export function IndexPage() {
  const { players }: LoaderProps = getRouteApi(leaguePaths.Players.Index).useLoaderData();

  useTitle("Players");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Players", to: leaguePaths.Players.Index },
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
