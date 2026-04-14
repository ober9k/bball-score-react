import { divisionsPaths } from "@/routes/league/divisions/routes.ts";
import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { DivisionDataWithId } from "@/types/division.ts";
import { Link } from "@tanstack/react-router";

type Props = {
  division: DivisionDataWithId,
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
          <Link to={divisionsPaths.Division} params={{ divisionId: division.id }}>
            View Division
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
