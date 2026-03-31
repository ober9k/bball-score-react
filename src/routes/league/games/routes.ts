import GamePage from "@/pages/league/games/game-page";
import GamesPage from "@/pages/league/games/games-page";
import type { Route } from "@/routes/route";
import { mapRoute } from "@/routes/route";

const paths = {
  Games: "/league/games",
  Game:  "/league/games/$gameId",
};

const routes: Route[] = [{
  path: paths.Games,
  component: GamesPage,
}, {
  path: paths.Game,
  component: GamePage,
}];

export const gamesPaths = paths;
export const gamesRoutes = routes
    .map(mapRoute);
