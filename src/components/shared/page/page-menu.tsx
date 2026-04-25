import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/shared/components/ui/navigation-menu.tsx";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

export type PageLink = {
  title: string,
  to: string,
  params: { id: number },
};

type Props = {
  links: PageLink[],
  isActive: (link: PageLink) => boolean,
};

export function PageMenu(props: Props) {
  const { links, isActive } = props;

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
