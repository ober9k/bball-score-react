import usePageContext from "@/hooks/use-page-context.ts";
import { gamesPaths } from "@/routes/league/games/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export default function GamePage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Game", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Games", to: gamesPaths.Games },
      { title: "Game" },
    ]);
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={gamesPaths.Games}>
          Goto: Games
        </Link>
      </p>
    </>
  );
}
