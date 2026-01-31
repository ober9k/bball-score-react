import type { Team } from "../types/Team.ts";

type TeamsListProps = {
  teams: Array<Team>,
}

export default function TeamsList({ teams }: TeamsListProps) {
  return (
    <div>
      <ul>
        {teams.map((teams) => (
          <li key={teams.id}>
            {teams.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
