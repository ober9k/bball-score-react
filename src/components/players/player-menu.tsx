import { type PageLink, PageMenu } from "@/components/shared/page/page-menu.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { Player } from "@/types/player.ts";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useCallback } from "react";

type Props = {
  player: Player,
};

export function PlayerMenu(props: Props) {
  const { player } = props;
  const { latestLocation } = useRouter();

  const applyPlayerId = (url: string): string => {
    return url.replace("$playerId", player.id.toString());
  };

  const links: PageLink[] = [
    { title: "Team Home",  to: applyPlayerId(leaguePaths.Players.View) },
    { title: "Game Log",   to: applyPlayerId(leaguePaths.Players.Games) },
    { title: "Statistics", to: applyPlayerId(leaguePaths.Players.Statistics) },
  ];

  const isActive = useCallback((link) => {
    return (latestLocation.href === link.to.replace("$playerId", player.id.toString()));
  }, [player.id]);

  return (
    <Fragment>
      <PageMenu links={links} isActive={isActive} />
    </Fragment>
  );
}
