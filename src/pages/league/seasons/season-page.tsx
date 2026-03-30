import { seasonsPaths } from "@/routes/league/seasons/routes.ts";
import { Link } from "@tanstack/react-router";

export default function SeasonPage() {
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
