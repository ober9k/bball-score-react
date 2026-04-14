import { buildGameQueryOptions, buildPlayerQueryOptions, gamesQueryOptions, playersQueryOptions } from "@/apis/query-options.ts";
import GamePage from "@/pages/league/games/game-page";
import GamesPage from "@/pages/league/games/games-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";
import type { AxiosError } from "axios";

async function gamesLoader({ context }) {
  return {
    games: await context.queryClient.fetchQuery(gamesQueryOptions)
  };
}

async function gameLoader({ context, params }) {
  const gameId = +params["gameId"];

  try {
    return {
      game: await context.queryClient.fetchQuery(buildGameQueryOptions(gameId))
    };
  }
  catch (error: AxiosError) {
    throw new Error(error.message);
  }
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
  loader: gameLoader,
}];

export const gamesPaths = paths;
export const gamesRoutes = routes
    .map(mapRoute);
