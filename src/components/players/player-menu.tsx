import { PageMenu } from "@/components/shared/page/page-menu.tsx";
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

  const links = [
    { title: "Team Home",  to: leaguePaths.Players.View,       params: { id: player.id } },
    { title: "Game Log",   to: leaguePaths.Players.Games,      params: { id: player.id } },
    { title: "Statistics", to: leaguePaths.Players.Statistics, params: { id: player.id } },
  ];

  const isActive = useCallback((link) => {
    return (latestLocation.href === link.to.replace("$playerId", player.id.toString()));
  });

  return (
    <Fragment>
      <PageMenu links={links} isActive={isActive} />
    </Fragment>
  );
}
