import { divisionsPaths } from "@/routes/league/divisions/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  division: { id: number, name: string }, /* TBD for using types */
}

export default function DivisionPage() {
  const { division }: LoaderProps = getRouteApi(divisionsPaths.Division).useLoaderData();

  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Division
      </h1>
      <ul className="p-2 text-sm">
        <li>
          <Link to={divisionsPaths.Divisions}>
            Goto: Divisions
          </Link>
        </li>
      </ul>
      <p className="p-2 text-sm">
        <strong>Name:</strong> {division.name}
      </p>
    </>
  );
}
