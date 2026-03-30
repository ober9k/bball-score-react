import { playersPaths } from "@/routes/league/players/routes.ts";
import { Link } from "@tanstack/react-router";

export default function PlayerPage() {
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Player
      </h1>
      <p className="p-2 text-sm">
        <Link to={playersPaths.Players}>
          Goto: Players
        </Link>
      </p>
    </>
  );
}
