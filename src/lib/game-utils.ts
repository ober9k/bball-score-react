import { type Game, Outcome, type OutcomeType, Phase, type PhaseType, type Round, Side, type SideType } from "@/types/game.ts";
import type { Stats } from "@/types/stats.ts";

export function mapSide(side: string): SideType {
  switch (side) {
    case "AWAY_TEAM": return Side.AWAY_TEAM;
    case "HOME_TEAM": return Side.HOME_TEAM;
    default:
      throw Error("Unexpected `Side` provided.");
  }
}

export function mapPhase(position: string): PhaseType {
  switch (position) {
    case "PRE_SEASON":     return Phase.PRE_SEASON;
    case "REGULAR_SEASON": return Phase.REGULAR_SEASON;
    case "POST_SEASON":    return Phase.POST_SEASON;
    default:
      throw Error("Unexpected `phase` provided.");
  }
}

/**
 * This will later factor in working with quarters, halves, etc.
 */
export function generateScoreTitles(periods: number): string[] {
  const otTitles: string[] = [];

  if (periods === 5) otTitles.push("OT");
  if (periods > 5) {
    for (let i = 5; i < periods; i++) {
      otTitles.push(`OT${i-4}`);
    }
  }

  return ["1Q", "2Q", "3Q", "4Q", ...otTitles];
}

/**
 * Add common stats for picking the game leaders for each team.
 */
export function calcLeaderScore(stats: Stats): number {
  return (stats)
    ? stats.points + stats.rebounds + stats.assists
    : 0; /* initial run */
}

export function deriveOutcome(teamScore: number, opposingTeamScore: number): string {
  switch (true) {
    case teamScore > opposingTeamScore: return Outcome.WIN;
    case teamScore < opposingTeamScore: return Outcome.LOSE;
    default: return Outcome.DRAW;
  }
}

export function mapOutcomeAbbreviation(outcome: string): string {
  switch (outcome) {
    case Outcome.WIN:     return "W";
    case Outcome.LOSE:    return "L";
    case Outcome.DRAW:    return "D";
    case Outcome.FORFEIT: return "F";
    case Outcome.BYE:     return "B";
    default:
      throw Error("Unexpected `outcome` provided.");
  }
}

function buildRound(game: Game): Round {
  const title = `Round ${game.round}`;
  const { round, phase } = game;

  return {
    title,
    round,
    phase,
    games: [game],
  }
}

export function groupByRound(games: Game[]): Array<Round> {
  return games.reduce<Round[]>((rounds, game) => {
    const round = rounds.find(({ round }) => round === game.round);

    if (round) {
      round.games.push(game);
    } 
    else {
      rounds.push(buildRound(game));
    }

    return rounds;
  }, []);
}
