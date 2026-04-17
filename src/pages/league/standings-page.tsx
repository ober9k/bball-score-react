import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";

export function StandingsPage() {
  useTitle("Standings");
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Standings" },
  ]);

  return (
    <>
      <p className="p-2 text-sm">
        TBD.
      </p>
    </>
  );
}

export { StandingsPage as LeagueStandingsPage };
