import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { seasonsPaths } from "@/routes/league/seasons/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { useEffect } from "react";

type LoaderProps = {
  season: { id: number, name: string }, /* TBD for using types */
}

export default function SeasonPage() {
  const { season }: LoaderProps = getRouteApi(seasonsPaths.Season).useLoaderData();
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Season", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Seasons", to: seasonsPaths.Seasons },
      { title: "Season" },
    ]);
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={seasonsPaths.Seasons}>
          Goto: Seasons
        </Link>
      </p>
      <p className="p-2 text-sm">
        {season.name}
      </p>
    </>
  );
}
