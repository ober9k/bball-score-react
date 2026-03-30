import { teamsPaths } from "@/routes/league/teams/routes.ts";
import { Link } from "@tanstack/react-router";

export default function TeamPage() {
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
