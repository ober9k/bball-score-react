import type { GamesLoaderProps } from "@/apis/loaders/types.ts";
import GameCard from "@/components/games/game-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export default function IndexPage() {
  const { games }: GamesLoaderProps = getRouteApi(leaguePaths.Games.Index).useLoaderData();

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
