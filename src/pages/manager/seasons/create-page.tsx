import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { Fragment } from "react";

export default function CreatePage() {
  useTitle("Create Season");
  useBreadcrumbs([
    { title: "Manager", to: leaguePaths.League },
    { title: "Seasons", to: managerPaths.Seasons.Index },
    { title: "Create Season" },
  ]);

  return (
    <Fragment>
      Create
    </Fragment>
  );
}
