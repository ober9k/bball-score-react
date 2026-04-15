import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  division: { id: number, name: string }, /* TBD for using types */
}

export function ViewPage() {
  const { division }: LoaderProps = getRouteApi(leaguePaths.Divisions.View).useLoaderData();

  useTitle("Division", division.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Divisions", to: leaguePaths.Divisions.Index },
    { title: division.name },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={leaguePaths.Divisions.View}>
          Goto: Divisions
        </Link>
      </p>
      <p className="p-2 text-sm flex flex-col gap-2">
        {division.name}
      </p>
    </>
  );
}

export { ViewPage as DivisionsViewPage };
