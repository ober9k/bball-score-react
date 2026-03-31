import usePageContext from "@/hooks/use-page-context.ts";
import { playersPaths } from "@/routes/league/players/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { useEffect } from "react";

type LoaderProps = {
  player: { id: number, name: string, number: string, position: string }, /* TBD for using types */
}

export default function PlayerPage() {
  const { player }: LoaderProps = getRouteApi(playersPaths.Player).useLoaderData();
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Player", player.name, [
      { title: "League", to: leaguePaths.League },
      { title: "Players", to: playersPaths.Players },
      { title: player.name },
    ]);
  }, []);

  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Player
      </h1>
      <p className="p-2 text-sm">
        <Link to={playersPaths.Players}>
          Goto: Players
        </Link>
      </p>
      <p className="p-2 text-sm">
        {player.name} #{player.number}
      </p>
    </>
  );
}
