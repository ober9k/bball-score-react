import { leaguePaths } from "@/routes/league/routes.ts";
import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { Division } from "@/types/division.ts";
import { Link } from "@tanstack/react-router";

type Props = {
  division: Division,
}

export default function DivisionCard({ division }: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {division.name}
          </CardTitle>
        </CardHeader>
        <CardFooter className="border-t-gray-200 flex justify-center gap-2">
          <Link to={leaguePaths.Divisions.View} params={{ divisionId: division.id }}>
            View Division
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
