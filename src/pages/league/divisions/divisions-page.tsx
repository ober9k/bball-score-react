import DivisionCard from "@/components/divisions/division-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { DivisionDataWithId } from "@/types/division.ts";
import { getRouteApi } from "@tanstack/react-router";

type LoaderProps = {
  divisions: DivisionDataWithId[], /* TBD for using types */
}

export default function DivisionsPage() {
  const { divisions }: LoaderProps = getRouteApi(leaguePaths.Divisions.Index).useLoaderData();

  useTitle("Divisions");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Divisions", to: leaguePaths.Divisions.Index },
  ]);

  return (
    <>
      <div className="text-sm flex flex-col gap-4">
        {divisions.map((division) => (
          <DivisionCard division={division} key={division.id} />
        ))}
      </div>
    </>
  );
}
