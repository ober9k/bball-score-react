import PlayerPage from "@/pages/league/players/player-page";
import PlayersPage from "@/pages/league/players/players-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

const paths = {
  Players: "/league/players",
  Player:  "/league/player/$playerId",
};

const routes: Route[] = [{
  path: paths.Players,
  component: PlayersPage,
}, {
  path: paths.Player,
  component: PlayerPage,
}];

export const playersPaths = paths;
export const playersRoutes = routes
    .map(mapRoute);
