import { mockTeams } from "../data/Teams.ts";

export default function TeamsList() {
  const teams = mockTeams;

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
