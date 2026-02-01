import { findTeamById } from "../../data/Teams.ts";
import type { Game } from "../../types/Game.ts";

type MatchupProps = {
  game: Game,
}

export default function Matchup({ game }: MatchupProps) {
  const [ teamLogA, teamLogB ] = game.teamLogs;
  const teamA = findTeamById(teamLogA.teamId);
  const teamB = findTeamById(teamLogB.teamId);

  return (
    <>
      <div className={"matchup"}>
        <ul className={"flex flex-row justify-center p-2"}>
          <li className={"w-48"}>
            <strong>{teamA.name}</strong><br/>
            <span className={"text-xl"}>({teamLogA.teamScore})</span>
          </li>
          <li className={"w-12"}>
            vs.
          </li>
          <li className={"w-48"}>
            <strong>{teamB.name}</strong><br/>
            <span className={"text-xl"}>({teamLogB.teamScore})</span>
          </li>
        </ul>
        <p>
          {game.date.toLocaleDateString()}
        </p>
      </div>
    </>

  );
}