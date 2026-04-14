import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { divisionsPaths } from "@/routes/league/divisions/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  division: { id: number, name: string }, /* TBD for using types */
}

export default function DivisionPage() {
  const { division }: LoaderProps = getRouteApi(divisionsPaths.Division).useLoaderData();

  useTitle("Division", division.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Divisions", to: divisionsPaths.Divisions },
    { title: division.name },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={divisionsPaths.Divisions}>
          Goto: Divisions
        </Link>
      </p>
      <p className="p-2 text-sm flex flex-col gap-2">
        {division.name}
      </p>
    </>
  );
}
