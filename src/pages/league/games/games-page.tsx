import GameCard from "@/components/games/game-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { gamesPaths } from "@/routes/league/games/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { Game } from "@/types/game.ts";
import { getRouteApi } from "@tanstack/react-router";

type LoaderProps = {
  games: Game[],
};

export default function GamesPage() {
  const { games }: LoaderProps = getRouteApi(gamesPaths.Games).useLoaderData();

  useTitle("Games");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Games" },
  ]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </>
  );
}
