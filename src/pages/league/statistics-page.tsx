import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";

export function StatisticsPage() {
  useTitle("Statistics");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Statistics" },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        TBD.
      </p>
    </>
  );
}

export { StatisticsPage as LeagueStatisticsPage };
