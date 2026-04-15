import type { SeasonsLoaderProps } from "@/apis/loaders/types.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

export function IndexPage() {
  const { seasons }: SeasonsLoaderProps = getRouteApi(leaguePaths.Seasons.Index).useLoaderData();

  useTitle("Seasons");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
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

export { IndexPage as SeasonsIndexPage };
