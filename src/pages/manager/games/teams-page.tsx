import type { ManageGamesByIdLoaderProps } from "@/apis/manage/types/loader-props.ts";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { getRouteApi } from "@tanstack/react-router";
import { Fragment } from "react";

export function TeamsPage() {
  const { game }: ManageGamesByIdLoaderProps = getRouteApi(managerPaths.Games.Teams).useLoaderData();

  useTitle("Update Game Teams", game.id.toString());
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League.Index },
    { title: "Games", to: managerPaths.Games.Index },
    { title: "Update Game Teams" },
  ]);

  return (
    <Fragment>
      Teams Page.
    </Fragment>
  )
}

export { TeamsPage as GamesTeamsPage };
