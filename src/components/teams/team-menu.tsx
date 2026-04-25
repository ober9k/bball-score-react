import type { PageLink } from "@/components/shared/page/page-menu.tsx";
import { PageMenu } from "@/components/shared/page/page-menu.tsx";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { Team } from "@/types/team.ts";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useCallback } from "react";

type Props = {
  team: Team,
};

export function TeamMenu(props: Props) {
  const { team } = props;
  const { latestLocation } = useRouter();

  const links: PageLink[] = [
    { title: "Team Home",  to: leaguePaths.Teams.View,       params: { id: team.id } },
    { title: "Players",    to: leaguePaths.Teams.Players,    params: { id: team.id } },
    { title: "Statistics", to: leaguePaths.Teams.Statistics, params: { id: team.id } },
  ];

  const isActive = useCallback((link) => {
    return (latestLocation.href === link.to.replace("$teamId", team.id.toString()));
  });

  return (
    <Fragment>
      <PageMenu links={links} isActive={isActive} />
    </Fragment>
  );
}
