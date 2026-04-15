import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { SeasonDataWithId } from "@/types/season.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  season: SeasonDataWithId, /* TBD for using types */
}

export default function SeasonPage() {
  const { season }: LoaderProps = getRouteApi(leaguePaths.Seasons.View).useLoaderData();

  useTitle("Season", season.name)
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Seasons", to: leaguePaths.Seasons.Index },
    { title: "Season" },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={leaguePaths.Seasons.Index}>
          Goto: Seasons
        </Link>
      </p>
      <p className="p-2 text-sm">
        {season.name}
      </p>
    </>
  );
}
