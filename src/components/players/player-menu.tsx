import { leaguePaths } from "@/routes/league/routes.ts";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/shared/components/ui/navigation-menu.tsx";
import type { Player } from "@/types/player.ts";
import { Link, useRouter } from "@tanstack/react-router";
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
