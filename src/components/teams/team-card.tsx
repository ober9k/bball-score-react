import { leaguePaths } from "@/routes/league/routes.ts";
import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { Team } from "@/types/team.ts";
import { Link } from "@tanstack/react-router";

type Props = {
  team: Team,
}

export default function TeamCard({ team }: Props) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {team.name}
          </CardTitle>
        </CardHeader>
        <CardFooter className="border-t-gray-200 flex justify-center gap-2">
          <Link to={leaguePaths.Teams.View} params={{ teamId: team.id }}>
            View Team
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
