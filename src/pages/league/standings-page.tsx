import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { useEffect } from "react";

export default function StandingsPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("League", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Standings" },
    ]);
  }, []);

  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Standings
      </h1>
      <p className="p-2 text-sm">
        TBD.
      </p>
    </>
  );
}
