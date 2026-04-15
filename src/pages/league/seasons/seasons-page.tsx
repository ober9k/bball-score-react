import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { SeasonDataWithId } from "@/types/season.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  season: SeasonDataWithId[], /* TBD for using types */
}

export default function SeasonsPage() {
  const { seasons }: LoaderProps = getRouteApi(leaguePaths.Seasons.Index).useLoaderData();

  useTitle("Seasons");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Seasons" },
  ]);

  return (
    <>
      <div className="p-2 text-sm flex flex-col gap-2">
        {seasons.map((season) => (
          <Link to={leaguePaths.Seasons.View} params={{seasonId: season.id}} key={season.id}>
            {season.name}
          </Link>
        ))}
      </div>
    </>
  );
}
