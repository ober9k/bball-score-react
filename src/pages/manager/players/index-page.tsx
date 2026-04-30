import type { ManagePlayersAllLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { PlayerUpdateLink } from "@/components/shared/links.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

export function IndexPage() {
  const { players }: ManagePlayersAllLoaderProps = getRouteApi(managerPaths.Players.Index).useLoaderData();

  useTitle("Players");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Players" },
  ]);

  return (
    <Fragment>
      Index: [<Link to={managerPaths.Players.Create}>Create</Link>]
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} [<PlayerUpdateLink player={player} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export { IndexPage as PlayersIndexPage };
