import type { ManageGamesAllLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { GameUpdateLink } from "@/components/shared/links.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

export function IndexPage() {
  const { games }: ManageGamesAllLoaderProps = getRouteApi(managerPaths.Games.Index).useLoaderData();

  useTitle("Games");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Games" },
  ]);

  return (
    <Fragment>
      Index: [<Link to={managerPaths.Games.Create}>Create</Link>]
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.id} [<GameUpdateLink game={game} />]
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export { IndexPage as GamesIndexPage };
