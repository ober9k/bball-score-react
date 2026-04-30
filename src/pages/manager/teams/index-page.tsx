import type { ManageTeamsAllLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { TeamUpdateLink } from "@/components/shared/links.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

export function IndexPage() {
  const { teams }: ManageTeamsAllLoaderProps = getRouteApi(managerPaths.Teams.Index).useLoaderData();

  useTitle("Teams");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Teams" },
  ]);

  return (
    <Fragment>
      Index: [<Link to={managerPaths.Teams.Create}>Create</Link>]
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {team.name} [<TeamUpdateLink team={team} />]
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export { IndexPage as TeamsIndexPage };
