import { gamesPaths } from "@/routes/league/games/routes.ts";
import { Link } from "@tanstack/react-router";

export default function GamePage() {
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Game
      </h1>
      <p className="p-2 text-sm">
        <Link to={gamesPaths.Games}>
          Goto: Games
        </Link>
      </p>
    </>
  );
}
