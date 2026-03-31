import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { seasonsPaths } from "@/routes/league/seasons/routes.ts";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export default function SeasonPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Season", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Seasons", to: seasonsPaths.Seasons },
      { title: "Season" },
    ]);
  }, []);

  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Season
      </h1>
      <p className="p-2 text-sm">
        <Link to={seasonsPaths.Seasons}>
          Goto: Seasons
        </Link>
      </p>
    </>
  );
}
