import { fetchAll, fetchById } from "@/apis/api.ts";
import { buildGameQueryOptions, gamesQueryOptions } from "@/apis/query-options.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page.tsx";
import GamePage from "@/pages/league/games/game-page";
import GamesPage from "@/pages/league/games/games-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

export async function gamesLoader({ context }) {
  return fetchAll(context.queryClient, gamesQueryOptions);
}

export async function gameLoader({ context, params }) {
  const gameId = +params["gameId"];
  return fetchById(context.queryClient, buildGameQueryOptions(gameId));
}

const paths = {
  Games: "/league/games",
  Game:  "/league/games/$gameId",
};

const routes: Route[] = [{
  path: paths.Games,
  component: GamesPage,
  loader: gamesLoader,
}, {
  path: paths.Game,
  component: GamePage,
  notFoundComponent: NotFoundPage,
  loader: gameLoader,
}];

export const gamesPaths = paths;
export const gamesRoutes = routes
    .map(mapRoute);
