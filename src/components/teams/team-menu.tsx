import { type PageLink, PageMenu } from "@/components/shared/page/page-menu.tsx";
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

  const applyTeamId = (url: string): string => {
    return url.replace("$teamId", team.id.toString());
  };

  const links: PageLink[] = [
    { title: "Team Home",  to: applyTeamId(leaguePaths.Teams.View) },
    { title: "Players",    to: applyTeamId(leaguePaths.Teams.Players) },
    { title: "Statistics", to: applyTeamId(leaguePaths.Teams.Statistics) },
  ];

  const isActive = useCallback((link) => {
    return (latestLocation.href === link.to.replace("$teamId", team.id.toString()));
  }, [team.id]);

  return (
    <Fragment>
      <PageMenu links={links} isActive={isActive} />
    </Fragment>
  );
}
