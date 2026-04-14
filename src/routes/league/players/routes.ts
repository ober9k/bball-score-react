import { buildPlayerQueryOptions, playersQueryOptions } from "@/apis/query-options";
import NotFoundPage from "@/pages/league/errors/not-found-page";
import PlayerPage from "@/pages/league/players/player-page";
import PlayersPage from "@/pages/league/players/players-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";
import type { AxiosError } from "axios";

export async function playersLoader({ context }) {
  return {
    players: await context.queryClient.fetchQuery(playersQueryOptions)
  };
}

export async function playerLoader({ context, params }) {
  const playerId = +params["playerId"];

  try {
    return {
      player: await context.queryClient.fetchQuery(buildPlayerQueryOptions(playerId))
    };
  }
  catch (error: AxiosError) {
    throw new Error(error.message);
  }
}

const paths = {
  Players: "/league/players",
  Player:  "/league/players/$playerId",
};

const routes: Route[] = [{
  path: paths.Players,
  component: PlayersPage,
  loader: playersLoader,
}, {
  path: paths.Player,
  component: PlayerPage,
  errorComponent: NotFoundPage,
  loader: playerLoader,
}];

export const playersPaths = paths;
export const playersRoutes = routes
    .map(mapRoute);
