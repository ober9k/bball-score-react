import type { DivisionsLoaderProps } from "@/apis/loaders/types.ts";
import { DivisionUpdateLink } from "@/components/shared/links.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

export function IndexPage() {
  const { divisions }: DivisionsLoaderProps = getRouteApi(managerPaths.Divisions.Index).useLoaderData();

  useTitle("Divisions");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Divisions" },
  ]);

  return (
    <Fragment>
      Index: [<Link to={managerPaths.Divisions.Create}>Create</Link>]
      <ul>
        {divisions.map((division) => (
          <li key={division.id}>
            {division.name} [<DivisionUpdateLink division={division} />]
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export { IndexPage as DivisionsIndexPage };
