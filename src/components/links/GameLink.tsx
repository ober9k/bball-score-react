import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Paths } from "../../routes/paths.ts";
import type { Game } from "../../types/Game.ts";

type GameLinkProps = {
  children: ReactNode, /* todo: display the game differently */
  game: Game,
}

export default function GameLink({ children, game }: GameLinkProps) {
  return (
    <Link to={Paths.Game} params={{ gameId: game.id }}>
      {children}
    </Link>
  );
}
