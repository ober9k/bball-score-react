import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { seasonsPaths } from "@/routes/league/seasons/routes.ts";
import type { SeasonDataWithId } from "@/types/season.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  season: SeasonDataWithId[], /* TBD for using types */
}

export default function SeasonsPage() {
  const { seasons }: LoaderProps = getRouteApi(seasonsPaths.Seasons).useLoaderData();

  useTitle("Seasons");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Seasons", to: seasonsPaths.Seasons },
  ]);

  return (
    <>
      <div className="p-2 text-sm flex flex-col gap-2">
        {seasons.map((season) => (
          <Link to={seasonsPaths.Season} params={{seasonId: season.id}} key={season.id}>
            {season.name}
          </Link>
        ))}
      </div>
    </>
  );
}
