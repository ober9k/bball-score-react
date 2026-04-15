import { useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Link } from "@tanstack/react-router";

export default function UnauthorizedPage() {
  useTitle("Unauthorized");

  return (
    <>
      <p className="p-2 text-sm">
        You do not have permission to view this page.
      </p>
      <p className="p-2 text-sm">
        Return to the league's <Link to={leaguePaths.League.Index}>home page</Link>.
      </p>
    </>
  );
}
