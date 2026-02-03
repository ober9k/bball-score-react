import { Link } from "@tanstack/react-router";
import { Paths } from "../../routes/paths.ts";
import type { Team } from "../../types/Team.ts";

type TeamLinkProps = {
  team: Team,
}

export default function TeamLink({ team }: TeamLinkProps) {
  return (
    <Link to={Paths.Team} params={{ teamId: team.id }}>
      {team.name}
    </Link>
  );
}
