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
  .set(StatsKey.TwoPointFieldGoals, "2P")
  .set(StatsKey.ThreePointFieldGoals, "3P")
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
  .set(StatsKey.TwoPointFieldGoalsPercentage, "2P%")
  .set(StatsKey.ThreePointFieldGoalsPercentage, "3P%")
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
 * Format shots made and attempted into percentage format.
 */
export function formatAttemptsPercentage(made: number, attempted: number): string {
  const precision = 1; /* only need single digit */
  const format = (percentage: number) => `${percentage.toFixed(precision)}%`;

  return (attempted > 0)
    ? format(made / attempted * 100)
    : format(0);
}

/**
 * Format shots made and attempted into dash format.
 */
export function formatAttemptsAsDashed(made: number, attempted: number, precision: number = 0): string {
  return `${made.toFixed(precision)}-${attempted.toFixed(precision)}`;
}

/**
 * Format shots made and attempted into dash format.
 */
export function getPoints(made: number, attempted: number, precision: number, asPercentage: boolean = true): string {
  return (asPercentage)
    ? formatAttemptsPercentage(made, attempted)
    : formatAttemptsAsDashed(made, attempted, precision);
}

/**
 * Check for relevant value to convert to stats.
 * @param statsKey
 */
function isPercentageStatsKey(statsKey: StatsKeyType): boolean {
  const statsKeys = [
    StatsKey.FieldGoalsPercentage,
    StatsKey.TwoPointFieldGoalsPercentage,
    StatsKey.ThreePointFieldGoalsPercentage,
    StatsKey.FreeThrowsPercentage,
  ];

  return statsKeys.includes(statsKey);
}

/**
 * Format respective stats value based on provided key.
 */
export function formatValue(stats: Stats, statsKey: StatsKeyType, precision = 0): string {
  const asPercentage = isPercentageStatsKey(statsKey);

  switch (statsKey) {
    case StatsKey.Minutes:
      return formatMinutes(stats.seconds);
    case StatsKey.FieldGoals:
    case StatsKey.FieldGoalsPercentage:
      return getPoints(stats.fgMade, stats.fgAttempted, precision, asPercentage);
    case StatsKey.TwoPointFieldGoals:
    case StatsKey.TwoPointFieldGoalsPercentage:
      return getPoints(stats.fgMade - stats.fg3Made, stats.fgAttempted - stats.fg3Attempted, precision, asPercentage);
    case StatsKey.ThreePointFieldGoals:
    case StatsKey.ThreePointFieldGoalsPercentage:
      return getPoints(stats.fg3Made, stats.fg3Attempted, precision, asPercentage);
    case StatsKey.FreeThrows:
    case StatsKey.FreeThrowsPercentage:
      return getPoints(stats.ftMade, stats.ftAttempted, precision, asPercentage);
    default:
      /* standard value handling */
      return stats[statsKey].toFixed(precision);
  }
}

export function getInitialAccumulator(): Stats {
  return {
    seconds:        0,
    fgMade:         0,
    fgAttempted:    0,
    fg3Made:        0,
    fg3Attempted:   0,
    ftMade:         0,
    ftAttempted:    0,
    points:         0,
    offRebounds:    0,
    defRebounds:    0,
    rebounds:       0,
    assists:        0,
    steals:         0,
    blocks:         0,
    turnovers:      0,
    personalFouls:  0,
    technicalFouls: 0,
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
      seconds:        acc.seconds        + cur.seconds,
      fgMade:         acc.fgMade         + cur.fgMade,
      fgAttempted:    acc.fgAttempted    + cur.fgAttempted,
      fg3Made:        acc.fg3Made        + cur.fg3Made,
      fg3Attempted:   acc.fg3Attempted   + cur.fg3Attempted,
      ftMade:         acc.ftMade         + cur.ftMade,
      ftAttempted:    acc.ftAttempted    + cur.ftAttempted,
      points:         acc.points         + cur.points,
      offRebounds:    acc.offRebounds    + cur.offRebounds,
      defRebounds:    acc.defRebounds    + cur.defRebounds,
      rebounds:       acc.rebounds       + cur.rebounds,
      assists:        acc.assists        + cur.assists,
      steals:         acc.steals         + cur.steals,
      blocks:         acc.blocks         + cur.blocks,
      turnovers:      acc.turnovers      + cur.turnovers,
      personalFouls:  acc.personalFouls  + cur.personalFouls,
      technicalFouls: acc.technicalFouls + cur.technicalFouls,
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
