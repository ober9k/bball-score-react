import type { TeamLoaderProps } from "@/apis/loaders/types.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function ViewPage() {
  const { team }: TeamLoaderProps = getRouteApi(leaguePaths.Teams.View).useLoaderData();

  useTitle("Team", team.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Teams", to: leaguePaths.Teams.Index },
    { title: team.name },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        {team.name}
      </p>
    </>
  );
}

export { ViewPage as TeamsViewPage };
