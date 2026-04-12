import PlayerCard from "@/components/players/player-card.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import { playersPaths } from "@/routes/league/players/routes";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { Player } from "@/types/player.ts";
import { getRouteApi } from "@tanstack/react-router";
import { useEffect } from "react";

type LoaderProps = {
  players: Player[],
}

export default function PlayersPage() {
  const { players }: LoaderProps = getRouteApi(playersPaths.Players).useLoaderData();
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Players", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Players", to: playersPaths.Players },
    ]);
  }, []);
  
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
