import type { SeasonsLoaderProps } from "@/apis/loaders/types.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

export function IndexPage() {
  const { seasons }: SeasonsLoaderProps = getRouteApi(managerPaths.Seasons.Index).useLoaderData();

  useTitle("Seasons");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Seasons" },
  ]);

  return (
    <Fragment>
      Index: [<Link to={managerPaths.Seasons.Create}>Create</Link>]
      <ul>
        {seasons.map((season) => (
          <li key={season.id}>
            {season.name} [<Link to={managerPaths.Seasons.Update} params={{ seasonId: season.id }}>Edit</Link>]
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export { IndexPage as SeasonsIndexPage };
