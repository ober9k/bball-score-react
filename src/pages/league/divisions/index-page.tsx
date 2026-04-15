import type { DivisionsLoaderProps } from "@/apis/loaders/types.ts";
import DivisionCard from "@/components/divisions/division-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { getRouteApi } from "@tanstack/react-router";

export function IndexPage() {
  const { divisions }: DivisionsLoaderProps = getRouteApi(leaguePaths.Divisions.Index).useLoaderData();

  useTitle("Divisions");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Divisions" },
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

export { IndexPage as DivisionsIndexPage };
