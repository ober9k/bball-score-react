import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { useEffect } from "react";

export function StatisticsPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("League", "", [
      { title: "League", to: leaguePaths.League.Index },
      { title: "Statistics" },
    ]);
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        TBD.
      </p>
    </>
  );
}

export { StatisticsPage as LeagueStatisticsPage };
