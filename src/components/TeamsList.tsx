import type { Team } from "../types/Team.ts";
import TeamLink from "./links/TeamLink.tsx";

type TeamsListProps = {
  teams: Array<Team>,
}

export default function TeamsList({ teams }: TeamsListProps) {
  return (
    <div>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <strong>
              <TeamLink team={team} />
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
