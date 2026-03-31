import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { teamsPaths } from "@/routes/league/teams/routes.ts";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export default function TeamPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Team", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Teams", to: teamsPaths.Teams },
      { title: "Team" },
    ]);
  }, []);
  
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Team
      </h1>
      <p className="p-2 text-sm">
        <Link to={teamsPaths.Teams}>
          Goto: Teams
        </Link>
      </p>
    </>
  );
}
