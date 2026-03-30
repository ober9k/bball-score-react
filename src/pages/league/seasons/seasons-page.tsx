import { seasonsPaths } from "@/routes/league/seasons/routes.ts";
import { Link } from "@tanstack/react-router";

export default function SeasonsPage() {
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Seasons
      </h1>
      <p className="p-2 text-sm">
        <Link to={seasonsPaths.Season} params={{ seasonId: 1 }}>
          Goto: Season 1
        </Link>
      </p>
    </>
  );
}
