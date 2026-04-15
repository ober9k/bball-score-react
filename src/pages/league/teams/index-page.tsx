import TeamCard from "@/components/teams/team-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { TeamDataWithId } from "@/types/team.ts";
import { getRouteApi } from "@tanstack/react-router";

type LoaderProps = {
  team: TeamDataWithId[], /* TBD for using types */
}

export function IndexPage() {
  const { teams }: LoaderProps = getRouteApi(leaguePaths.Teams.Index).useLoaderData();

  useTitle("Teams");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Teams" },
  ]);

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

export { IndexPage as TeamsIndexPage };
