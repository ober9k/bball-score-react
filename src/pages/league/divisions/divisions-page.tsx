import { divisionsPaths } from "@/routes/league/divisions/routes.ts";
import { Link } from "@tanstack/react-router";

export default function DivisionsPage() {
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Divisions
      </h1>
      <p className="p-2 text-sm">
        <Link to={divisionsPaths.Division} params={{ divisionId: 1 }}>
          Goto: Division 1
        </Link>
      </p>
    </>
  );
}
