import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { teamsPaths } from "@/routes/league/teams/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { useEffect } from "react";

type LoaderProps = {
  team: { id: number, name: string }[], /* TBD for using types */
}

export default function TeamsPage() {
  const { teams }: LoaderProps = getRouteApi(teamsPaths.Teams).useLoaderData();
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Teams", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Teams", to: teamsPaths.Teams },
    ]);
  }, []);
  
  return (
    <>
      <div className="p-2 text-sm flex flex-col gap-2">
        {teams.map((team) => (
          <Link to={teamsPaths.Team} params={{teamId: team.id}} key={team.id}>
            {team.name}
          </Link>
        ))}
      </div>
    </>
  );
}
