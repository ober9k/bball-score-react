import { findTeamById } from "../../data/Teams.ts";
import type { Game } from "../../types/Game.ts";
import type { TeamLog } from "../../types/game/TeamLog.ts";
import TeamLink from "../links/TeamLink.tsx";

type TeamScoreProps = {
  teamLog: TeamLog,
}

type MatchupProps = {
  game: Game,
}

function TeamScore({ teamLog }: TeamScoreProps) {
  const team = findTeamById(teamLog.teamId);

  return (
    <>
      <p>
        <strong>
          <TeamLink team={team} />
        </strong>
      </p>
      <p>
        <span className={"text-xl"}>({teamLog.teamScore})</span>
      </p>
    </>
  );
}

export default function Matchup({game}: MatchupProps) {
  const [homeTeam, awayTeam] = game.teamLogs;

  return (
    <>
      <div className={"matchup"}>
        <ul className={"flex flex-row justify-center p-2"}>
          <li className={"w-48"}>
            <TeamScore teamLog={homeTeam} />
          </li>
          <li className={"w-12"}>
            vs.
          </li>
          <li className={"w-48"}>
            <TeamScore teamLog={awayTeam} />
          </li>
        </ul>
        <p>
          {game.date.toLocaleDateString()}
        </p>
      </div>
    </>

  );
}