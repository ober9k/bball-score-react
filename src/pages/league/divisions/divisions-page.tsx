import { divisionsPaths } from "@/routes/league/divisions/routes.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

type LoaderProps = {
  divisions: { id: number, name: string }[], /* TBD for using types */
}

export default function DivisionsPage() {
  const { divisions }: LoaderProps = getRouteApi(divisionsPaths.Divisions).useLoaderData();

  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        League Divisions
      </h1>
      <ul className="p-2 text-sm">
        {divisions.map((d) => (
          <li key={d.id}>
            <Link to={divisionsPaths.Division} params={{ divisionId: d.id }}>
              &bull; Goto: {d.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
