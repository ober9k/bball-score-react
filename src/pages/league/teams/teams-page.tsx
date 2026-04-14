import TeamCard from "@/components/teams/team-card.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { teamsPaths } from "@/routes/league/teams/routes.ts";
import type { TeamDataWithId } from "@/types/team.ts";
import { getRouteApi } from "@tanstack/react-router";
import { useEffect } from "react";

type LoaderProps = {
  team: TeamDataWithId[], /* TBD for using types */
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
      <div className="text-sm flex flex-col gap-4">
        {teams.map((team) => (
          <TeamCard team={team} key={team.id} />
        ))}
      </div>
    </>
  );
}
