import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { TeamDataWithId } from "@/types/team.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

type LoaderProps = {
  teams: TeamDataWithId[], /* temp */
}

export function IndexPage() {
  const { teams }: LoaderProps = getRouteApi(managerPaths.Teams.Index).useLoaderData();

  useTitle("Teams");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League },
    { title: "Teams" },
  ]);

  return (
    <Fragment>
      Index: [<Link to={managerPaths.Teams.Create}>Create</Link>]
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {team.name} [<Link to={managerPaths.Teams.Update} params={{ teamId: team.id }}>Edit</Link>]
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export { IndexPage as TeamsIndexPage };
