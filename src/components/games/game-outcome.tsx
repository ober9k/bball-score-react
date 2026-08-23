import { deriveOutcome, mapOutcomeAbbreviation } from "@/lib/game-utils";

type GameOutcomeProps = {
  playerTeamScore: number,
  opposingTeamScore: number,
}

function GameOutcome(props: GameOutcomeProps) {
  const { playerTeamScore, opposingTeamScore } = props;
  const outcomeAbbreviation = mapOutcomeAbbreviation(deriveOutcome(playerTeamScore, opposingTeamScore));

  return (
    <>
      <span className="font-normal">({outcomeAbbreviation} {playerTeamScore}-{opposingTeamScore})</span>
    </>
  );
}

export default GameOutcome;
