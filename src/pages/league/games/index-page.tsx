import GameCard from "@/components/games/game-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { Game } from "@/types/game.ts";
import { getRouteApi } from "@tanstack/react-router";

type LoaderProps = {
  games: Game[],
};

export default function IndexPage() {
  const { games }: LoaderProps = getRouteApi(leaguePaths.Games.Index).useLoaderData();

  useTitle("Games");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
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

export { IndexPage as GamesIndexPage };
