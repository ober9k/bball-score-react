import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { gamesPaths } from "@/routes/league/games/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { Game } from "@/types/game.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  game: Game, /* TBD for using types */
}

export default function GamePage() {
  const { game }: LoaderProps = getRouteApi(gamesPaths.Game).useLoaderData();

  useTitle("Game", `#${game.id}`); /* gameId for now */
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Games", to: gamesPaths.Games },
    { title: "Game" },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={gamesPaths.Games}>
          Goto: Games
        </Link>
      </p>
    </>
  );
}
