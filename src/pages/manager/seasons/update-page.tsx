import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import type { SeasonDataWithId } from "@/types/season.ts";
import { getRouteApi } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";

type LoaderProps = {
  season: SeasonDataWithId, /* temp */
}

export default function UpdatePage() {
  const { season }: LoaderProps = getRouteApi(managerPaths.Seasons.Update).useLoaderData();
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Update Season", season.name, [
      { title: "Manager", to: leaguePaths.League },
      { title: "Seasons", to: managerPaths.Seasons.Index },
      { title: "Update Season" },
    ]);
  }, []);

  return (
    <Fragment>
      Update: {season.name}
    </Fragment>
  );
}
