import type { PlayerLog } from "@/types/game.ts";
import type { Stats, StatsKeyType } from "@/types/stats.ts";
import { StatsKey } from "@/types/stats.ts";

/**
 * Table cell titles for stats pages.
 * This should be relocated and make use of phrases.
 */
const statsTitles = new Map<StatsKeyType, string>()
  .set(StatsKey.Minutes, "MIN")
  .set(StatsKey.FieldGoals, "FG")
  .set(StatsKey.TwoPointFieldGoals, "2PT")
  .set(StatsKey.ThreePointFieldGoals, "3PT")
  .set(StatsKey.FreeThrows, "FT")
  .set(StatsKey.OffensiveRebounds, "OREB")
  .set(StatsKey.DefensiveRebounds, "DREB")
  .set(StatsKey.Rebounds, "REB")
  .set(StatsKey.Assists, "AST")
  .set(StatsKey.Steals, "STL")
  .set(StatsKey.Blocks, "BLK")
  .set(StatsKey.Turnovers, "TOV")
  .set(StatsKey.PersonalFouls, "PF")
  .set(StatsKey.TechnicalFouls, "TF")
  .set(StatsKey.Points, "PTS")
  /* special percentage cases */
  .set(StatsKey.FieldGoalsPercentage, "FG%")
  .set(StatsKey.TwoPointFieldGoalsPercentage, "2PT%")
  .set(StatsKey.ThreePointFieldGoalsPercentage, "3PT%")
  .set(StatsKey.FreeThrowsPercentage,  "FT%")

export function getStatsTitle(statsKey: StatsKeyType): string {
  return statsTitles.get(statsKey);
}

/**
 * Format minutes:seconds display from the seconds.
 */
export function formatMinutes(seconds: number): string {
  if (seconds === 0) {
    return ""; /* cover just not displaying it */
  }

  return (new Intl.DateTimeFormat(navigator.language, {
    minute: "2-digit",
    second: "2-digit",
  })).format(new Date(0, 0, 0, 0, 0, seconds));
}

/**
 * Format shots made and attempted into dash format.
 */
export function formatAttempts(made: number, attempted: number, precision: number): string {
  return `${made.toFixed(precision)}-${attempted.toFixed(precision)}`;
}

/**
 * Format shots made and attempted into percentage format.
 */
export function formatAttemptsPercentage(made: number, attempted: number, precision: number = 1): string {
  const format = (percentage: number) => `${percentage.toFixed(precision)}%`;

  return (attempted > 0)
    ? format(made / attempted * 100)
    : format(0);
}

/**
 * Format respective stats value based on provided key.
 * TODO: this can be optimized... wtf is this ugly code
 */
export function formatValue(stats: Stats, statsKey: StatsKeyType, precision = 0): string {
  switch (statsKey) {
    case StatsKey.Minutes:
      return formatMinutes(stats.seconds);
    case StatsKey.FieldGoals:
      return formatAttempts(stats.fgMade, stats.fgAttempted);
    case StatsKey.FieldGoalsPercentage:
      return formatAttemptsPercentage(stats.fgMade, stats.fgAttempted);
    case StatsKey.TwoPointFieldGoals:
      return formatAttempts((stats.fgMade - stats.fg3Made), (stats.fgAttempted - stats.fg3Attempted));
    case StatsKey.TwoPointFieldGoalsPercentage:
      return formatAttemptsPercentage((stats.fgMade - stats.fg3Made), (stats.fgAttempted - stats.fg3Attempted));
    case StatsKey.ThreePointFieldGoals:
      return formatAttempts(stats.fg3Made, stats.fg3Attempted);
    case StatsKey.ThreePointFieldGoalsPercentage:
      return formatAttemptsPercentage(stats.fg3Made, stats.fg3Attempted);
    case StatsKey.FreeThrows:
      return formatAttempts(stats.ftMade, stats.ftAttempted);
    case StatsKey.FreeThrowsPercentage:
      return formatAttemptsPercentage(stats.ftMade, stats.ftAttempted);
    default:
      /* standard value handling */
      return stats[statsKey].toFixed(precision);
  }
}

export function getInitialAccumulator(): Stats {
  return {
    seconds:       0,
    fgMade:        0,
    fgAttempted:   0,
    fg3Made:       0,
    fg3Attempted:  0,
    ftMade:        0,
    ftAttempted:   0,
    offRebounds:   0,
    defRebounds:   0,
    rebounds:      0,
    assists:       0,
    steals:        0,
    blocks:        0,
    turnovers:     0,
    personalFouls: 0,
    points:        0,
  };
}

/**
 * Calculate the totals from the player logs.
 * Ideally, this can just loop over all the properties.
 */
export function calculateTotals(playerLogs: PlayerLog[]): Stats {
  return playerLogs
    .map((pl) => ({ ...pl.stats }))
    .reduce((acc: Stats, cur: Stats) => ({
      seconds:       acc.seconds       + cur.seconds,
      fgMade:        acc.fgMade        + cur.fgMade,
      fgAttempted:   acc.fgAttempted   + cur.fgAttempted,
      fg3Made:       acc.fg3Made       + cur.fg3Made,
      fg3Attempted:  acc.fg3Attempted  + cur.fg3Attempted,
      ftMade:        acc.ftMade        + cur.ftMade,
      ftAttempted:   acc.ftAttempted   + cur.ftAttempted,
      offRebounds:   acc.offRebounds   + cur.offRebounds,
      defRebounds:   acc.defRebounds   + cur.defRebounds,
      rebounds:      acc.rebounds      + cur.rebounds,
      assists:       acc.assists       + cur.assists,
      steals:        acc.steals        + cur.steals,
      blocks:        acc.blocks        + cur.blocks,
      turnovers:     acc.turnovers     + cur.turnovers,
      personalFouls: acc.personalFouls + cur.personalFouls,
      points:        acc.points        + cur.points,
    }), getInitialAccumulator())
}

export type ColumnsType = "basic" | "extended" | "complete";

const BasicColumns = [
  StatsKey.Rebounds,
  StatsKey.Assists,
  StatsKey.Steals,
  StatsKey.Blocks,
  StatsKey.Turnovers,
  StatsKey.PersonalFouls,
  StatsKey.Points,
] as const;

const ExtendedColumns = [
  StatsKey.Minutes,
  StatsKey.FieldGoals,
  StatsKey.ThreePointFieldGoals,
  StatsKey.FreeThrows,
  StatsKey.Rebounds,
  StatsKey.Assists,
  StatsKey.Steals,
  StatsKey.Blocks,
  StatsKey.Turnovers,
  StatsKey.PersonalFouls,
  StatsKey.Points,
] as const;

const CompleteColumns = [
  StatsKey.Minutes,
  StatsKey.FieldGoals,
  StatsKey.FieldGoalsPercentage,
  StatsKey.ThreePointFieldGoals,
  StatsKey.ThreePointFieldGoalsPercentage,
  StatsKey.FreeThrows,
  StatsKey.FreeThrowsPercentage,
  StatsKey.Rebounds,
  StatsKey.Assists,
  StatsKey.Steals,
  StatsKey.Blocks,
  StatsKey.Turnovers,
  StatsKey.PersonalFouls,
  StatsKey.Points,
] as const;

export const ColumnsMap = new Map<ColumnsType, Array<StatsKeyType>>()
  .set("basic",    BasicColumns)
  .set("extended", ExtendedColumns)
  .set("complete", CompleteColumns);
