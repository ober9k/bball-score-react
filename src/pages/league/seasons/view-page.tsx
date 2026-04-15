import type { SeasonLoaderProps } from "@/apis/loaders/types.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function ViewPage() {
  const { season }: SeasonLoaderProps = getRouteApi(leaguePaths.Seasons.View).useLoaderData();

  useTitle("Season", season.name)
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Seasons", to: leaguePaths.Seasons.Index },
    { title: "Season" },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        {season.name}
      </p>
    </>
  );
}

export { ViewPage as SeasonsViewPage };
