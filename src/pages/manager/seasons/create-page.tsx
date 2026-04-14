import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { Fragment, useEffect } from "react";

export default function CreatePage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Create Season", "", [
      { title: "Manager", to: leaguePaths.League },
      { title: "Seasons", to: managerPaths.Seasons.Index },
      { title: "Create Season" },
    ]);
  }, []);

  return (
    <Fragment>
      Create
    </Fragment>
  );
}
