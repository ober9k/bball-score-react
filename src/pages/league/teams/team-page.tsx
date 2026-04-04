import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { teamsPaths } from "@/routes/league/teams/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { useEffect } from "react";

type LoaderProps = {
  team: { id: number, name: string }, /* TBD for using types */
}

export default function TeamPage() {
  const { team }: LoaderProps = getRouteApi(teamsPaths.Team).useLoaderData();
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Team", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Teams", to: teamsPaths.Teams },
      { title: "Team" },
    ]);
  }, []);
  
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
