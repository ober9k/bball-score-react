import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { SeasonDataWithId } from "@/types/season.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";

type LoaderProps = {
  seasons: SeasonDataWithId[], /* temp */
}

export default function IndexPage() {
  const { seasons }: LoaderProps = getRouteApi(managerPaths.Seasons.Index).useLoaderData();
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Seasons", "", [
      { title: "Manager", to: leaguePaths.League },
      { title: "Seasons" },
    ]);
  }, []);

  return (
    <Fragment>
      Index:<br />
      <ul>
        {seasons.map((season) => (
          <li key={season.id}>
            {season.name} [<Link to={managerPaths.Seasons.Update} params={{ seasonId: season.id }}>Edit</Link>]
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
