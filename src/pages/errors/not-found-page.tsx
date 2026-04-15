import { useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Link } from "@tanstack/react-router";

export default function NotFoundPage() {
  useTitle("Not Found");

  return (
    <>
      <p className="p-2 text-sm">
        Whatever you were looking for wasn't found.
      </p>
      <p className="p-2 text-sm">
        Return to the league's <Link to={leaguePaths.League.Index}>home page</Link>.
      </p>
    </>
  );
}
