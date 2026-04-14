import GameCard from "@/components/games/game-card.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import { gamesPaths } from "@/routes/league/games/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { Game } from "@/types/game.ts";
import { getRouteApi } from "@tanstack/react-router";
import { useEffect } from "react";

type LoaderProps = {
  games: Game[],
};

export default function GamesPage() {
  const { setPageHeader } = usePageContext();
  const { games }: LoaderProps = getRouteApi(gamesPaths.Games).useLoaderData();

  useEffect(() => {
    setPageHeader("Games", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Games" },
    ]);
  }, []);

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
