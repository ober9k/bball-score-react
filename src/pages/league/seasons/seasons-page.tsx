import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { seasonsPaths } from "@/routes/league/seasons/routes.ts";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export default function SeasonsPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Seasons", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Seasons", to: seasonsPaths.Seasons },
    ]);
  }, []);
  
  return (
    <>
      <p className="p-2 text-sm">
        <Link to={seasonsPaths.Season} params={{ seasonId: 1 }}>
          Goto: Season 1
        </Link>
      </p>
    </>
  );
}
