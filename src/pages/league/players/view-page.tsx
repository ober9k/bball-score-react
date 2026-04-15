import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { PlayerDataWithId } from "@/types/player.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  player: PlayerDataWithId, /* TBD for using types */
}

export function ViewPage() {
  const { player }: LoaderProps = getRouteApi(leaguePaths.Players.View).useLoaderData();

  useTitle("Player", player.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Players", to: leaguePaths.Players.Index },
    { title: player.name },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={leaguePaths.Players.Index}>
          Goto: Players
        </Link>
      </p>
      <p className="p-2 text-sm">
        {player.name} #{player.number}
      </p>
    </>
  );
}

export { ViewPage as PlayersViewPage };
