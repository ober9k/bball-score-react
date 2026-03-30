import { divisionsPaths } from "@/routes/league/divisions/routes.ts";
import { Link } from "@tanstack/react-router";

export default function DivisionPage() {
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Division
      </h1>
      <p className="p-2 text-sm">
        <Link to={divisionsPaths.Divisions}>
          Goto: Divisions
        </Link>
      </p>
    </>
  );
}
