import type { Team } from "../types/Team.ts";
import TeamLink from "./links/TeamLink.tsx";

type TeamsListProps = {
  teams: Array<Team>,
}

function NonEmptyTeamsList({ teams }: TeamsListProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {teams.map((team) => (
        <div key={team.id} className="border border-gray-200 rounded-sm">
          <div className="relative min-h-20 bg-gray-300">
            <div className="absolute right-0">
              <img src="/images/player.png" alt={team.name} height={72} width={72} className={"mx-1"}/>
            </div>
            <div className="absolute p-2">
              <strong className="font-medium text-lg"><TeamLink team={team}/></strong>
            </div>
          </div>
          <div className="p-2">
            &nbsp;
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyTeamsList() {
  return (
    <p className="w-full text-center">
      No active teams to show for the current season.
    </p>
  )
}

export default function TeamsList({ teams }: TeamsListProps) {
  const hasPlayers = !!teams.length;

  return (
    <div>
      {hasPlayers ? (
        <NonEmptyTeamsList teams={teams} />
      ) : (
        <EmptyTeamsList/>
      )}
    </div>
  );
}
