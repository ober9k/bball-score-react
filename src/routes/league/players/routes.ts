import { fetchAll, fetchById } from "@/apis/api.ts";
import { buildPlayerQueryOptions, playersQueryOptions } from "@/apis/query-options";
import NotFoundPage from "@/pages/league/errors/not-found-page";
import PlayerPage from "@/pages/league/players/player-page";
import PlayersPage from "@/pages/league/players/players-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

export async function playersLoader({ context }) {
  return fetchAll(context.queryClient, playersQueryOptions);
}

export async function playerLoader({ context, params }) {
  const playerId = +params["playerId"];
  return fetchById(context.queryClient, buildPlayerQueryOptions(playerId));
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
  notFoundComponent: NotFoundPage,
  loader: playerLoader,
}];

export const playersPaths = paths;
export const playersRoutes = routes
    .map(mapRoute);
