import usePageContext from "@/hooks/use-page-context.ts";
import { gamesPaths } from "@/routes/league/games/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export default function GamesPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Games", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Games", to: gamesPaths.Games },
    ]);
  }, []);

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
