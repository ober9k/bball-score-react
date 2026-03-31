import usePageContext from "@/hooks/use-page-context.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { teamsPaths } from "@/routes/league/teams/routes.ts";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export default function TeamsPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Teams", "", [
      { title: "League", to: leaguePaths.League },
      { title: "Teams", to: teamsPaths.Teams },
    ]);
  }, []);
  
  return (
    <>
      <p className="p-2 text-sm">
        <Link to={teamsPaths.Team} params={{ teamId: 1 }}>
          Goto: Team 1
        </Link>
      </p>
    </>
  );
}
