import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { DivisionDataWithId } from "@/types/division.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

type LoaderProps = {
  divisions: DivisionDataWithId[], /* temp */
}

export function IndexPage() {
  const { divisions }: LoaderProps = getRouteApi(managerPaths.Divisions.Index).useLoaderData();

  useTitle("Divisions");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League },
    { title: "Divisions" },
  ]);

  return (
    <Fragment>
      Index: [<Link to={managerPaths.Divisions.Create}>Create</Link>]
      <ul>
        {divisions.map((division) => (
          <li key={division.id}>
            {division.name} [<Link to={managerPaths.Divisions.Update} params={{ divisionId: division.id }}>Edit</Link>]
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export { IndexPage as DivisionsIndexPage };
