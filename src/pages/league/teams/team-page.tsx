import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { teamsPaths } from "@/routes/league/teams/routes.ts";
import type { TeamDataWithId } from "@/types/team.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  team: TeamDataWithId, /* TBD for using types */
}

export default function TeamPage() {
  const { team }: LoaderProps = getRouteApi(teamsPaths.Team).useLoaderData();

  useTitle("Team", team.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Teams", to: teamsPaths.Teams },
    { title: "Team" },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={teamsPaths.Teams}>
          Goto: Teams
        </Link>
      </p>
      <p className="p-2 text-sm">
        {team.name}
      </p>
    </>
  );
}
