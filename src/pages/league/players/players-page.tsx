import { playersPaths } from "@/routes/league/players/routes.ts";
import { Link } from "@tanstack/react-router";

export default function PlayersPage() {
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Players
      </h1>
      <p className="p-2 text-sm">
        <Link to={playersPaths.Player} params={{ playerId: 1 }}>
          Goto: Player 1
        </Link>
      </p>
    </>
  );
}
