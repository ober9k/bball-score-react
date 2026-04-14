import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { playersPaths } from "@/routes/league/players/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  player: { id: number, name: string, number: string, position: string }, /* TBD for using types */
}

export default function PlayerPage() {
  const { player }: LoaderProps = getRouteApi(playersPaths.Player).useLoaderData();

  useTitle("Player", player.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Players", to: playersPaths.Players },
    { title: player.name },
  ]);

  return (
    <>
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
