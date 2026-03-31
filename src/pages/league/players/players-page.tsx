import usePageContext from "@/hooks/use-page-context.ts";
import { playersPaths } from "@/routes/league/players/routes";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { useEffect } from "react";

type LoaderProps = {
  players: { id: number, name: string, number: string, position: string }[], /* TBD for using types */
}

export default function PlayersPage() {
  const { players }: LoaderProps = getRouteApi(playersPaths.Players).useLoaderData();
  const { setTitle, setPageBreadcrumbs } = usePageContext();

  useEffect(() => {
    setTitle("Players");
    setPageBreadcrumbs([
      { title: "League", to: leaguePaths.League },
      { title: "Players", to: playersPaths.Players },
    ]);
  }, []);
  
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Players
      </h1>
      <div className="p-2 text-sm flex flex-col gap-2">
        {players.map((player) => (
          <Link to={playersPaths.Player} params={{ playerId: player.id }} key={player.id}>
            {player.name}
          </Link>
        ))}
      </div>
    </>
  );
}
