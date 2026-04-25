import { leaguePaths } from "@/routes/league/routes.ts";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/shared/components/ui/navigation-menu.tsx";
import type { Team } from "@/types/team.ts";
import { Link, useRouter } from "@tanstack/react-router";
import { Fragment, useCallback } from "react";

type Props = {
  team: Team,
};

export function TeamMenu(props: Props) {
  const { team } = props;
  const { latestLocation } = useRouter();

  const links = [
    { title: "Team Home",  to: leaguePaths.Teams.View,       params: { id: team.id } },
    { title: "Players",    to: leaguePaths.Teams.Players,    params: { id: team.id } },
    { title: "Statistics", to: leaguePaths.Teams.Statistics, params: { id: team.id } },
  ];

  const isActive = useCallback((link) => {
    return (latestLocation.href === link.to.replace("$teamId", team.id.toString()));
  });

  return (
    <Fragment>
      <div className="flex gap-2 justify-end pb-2">
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} data-active={isActive(link)}>
                  <Link to={link.to} params={link.params}>{link.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </Fragment>
  );
}
