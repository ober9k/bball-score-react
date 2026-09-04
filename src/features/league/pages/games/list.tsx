import type { GamesLoaderProps } from "@/apis/loaders/types.ts";
import GameResult from "@/components/games/game-result";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { groupByRound } from "@/lib/game-utils";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

function GamesList() {
  const { games }: GamesLoaderProps = getRouteApi(leaguePaths.Games.Index).useLoaderData();

  useTitle("Games");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Games" },
  ]);

  const rounds = groupByRound(games);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 -my-2 -mx-3 text-sm uppercase">
        {rounds.map((round) => (
          <section key={round.title}>
            <h2 className="px-2 pb-1">{round.title}</h2>
            {round.games.map((game) => (
              <GameResult key={game.id} game={game} />
              /* <GameCard key={game.id} game={game} /> */
            ))}
          </section>
        ))}
      </div>
    </>
  );
}

export default GamesList;
