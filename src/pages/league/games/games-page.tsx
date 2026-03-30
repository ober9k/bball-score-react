import { gamesPaths } from "@/routes/league/games/routes.ts";
import { Link } from "@tanstack/react-router";

export default function GamesPage() {
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Games
      </h1>
      <p className="p-2 text-sm">
        <Link to={gamesPaths.Game} params={{ gameId: 1 }}>
          Goto: Game 1
        </Link>
      </p>
    </>
  );
}
