import type { ManageSeasonsAllLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { SeasonUpdateLink } from "@/components/shared/links.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

export function IndexPage() {
  const { seasons }: ManageSeasonsAllLoaderProps = getRouteApi(managerPaths.Seasons.Index).useLoaderData();

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
            {season.name} [<SeasonUpdateLink season={season} />]
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export { IndexPage as SeasonsIndexPage };
