import { teamsPaths } from "@/routes/league/teams/routes.ts";
import { Link } from "@tanstack/react-router";

export default function TeamsPage() {
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Teams
      </h1>
      <p className="p-2 text-sm">
        <Link to={teamsPaths.Team} params={{ teamId: 1 }}>
          Goto: Team 1
        </Link>
      </p>
    </>
  );
}
