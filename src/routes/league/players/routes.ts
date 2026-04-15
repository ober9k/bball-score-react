import { playerLoader, playersLoader } from "@/apis/loaders.ts";
import NotFoundPage from "@/pages/league/errors/not-found-page";
import PlayerPage from "@/pages/league/players/player-page";
import PlayersPage from "@/pages/league/players/players-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

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
  loader: playersLoader,
}];

export const playersPaths = paths;
export const playersRoutes = routes
    .map(mapRoute);
