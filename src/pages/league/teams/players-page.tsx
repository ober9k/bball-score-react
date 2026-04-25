import type { TeamLoaderProps } from "@/apis/loaders/types.ts";
import PlayerCard from "@/components/players/player-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function PlayersPage() {
  const { team, players }: TeamLoaderProps = getRouteApi(leaguePaths.Teams.Players).useLoaderData();

  useTitle("Players", team.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Teams", to: leaguePaths.Teams.Index },
    { title: team.name + " Players" },
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

export { PlayersPage as TeamsPlayersPage };
