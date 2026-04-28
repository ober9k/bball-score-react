import type { StandingsKeyType, StandingsLog } from "@/types/standings-log.ts";
import { StandingsKey } from "@/types/standings-log.ts";

const WinPercentPrecision = 3;
const PointsDiffPrecision = 1;

export function formatWinPercent(wins: number, played: number): string {
  return (wins / played)
    .toFixed(WinPercentPrecision);
}

export function formatPointsDiff(pointsFor: number, pointsAgainst: number, played: number): string {
  const diff = ((pointsFor - pointsAgainst) / played);
  const prefix = (diff > 0) ? "+" : "";
  const diffValue = diff.toFixed(PointsDiffPrecision);

  return `${prefix}${diffValue}`;
}

export function formatPoints(wins: number, losses: number, draws: number, byes: number): number {
  return (wins * 3) + (losses) + (draws * 2) + (byes);
}

/**
 * Table cell titles for stats pages.
 * This should be relocated and make use of phrases.
 */
const standingsTitles = new Map<StandingsKeyType, string>()
  .set(StandingsKey.Played, "GP")
  .set(StandingsKey.Wins, "W")
  .set(StandingsKey.Losses, "L")
  .set(StandingsKey.Draws, "D")
  .set(StandingsKey.Byes, "B")
  .set(StandingsKey.Forfeits, "F")
  .set(StandingsKey.WinPercent, "WIN%")
  .set(StandingsKey.PointsDiff, "DIFF")
  .set(StandingsKey.Points, "PTS")

export function getStandingsTitle(standingsKey: StandingsKeyType): string {
  return standingsTitles.get(standingsKey);
}

/**
 * Format respective stats value based on provided key.
 */
export function formatValue(log: StandingsLog, standingsKey: StandingsKeyType): string {
  switch (standingsKey) {
    case StandingsKey.WinPercent:
      return formatWinPercent(log.wins, log.played);
    case StandingsKey.PointsDiff:
      return formatPointsDiff(log.pointsFor, log.pointsAgainst, log.played);
    case StandingsKey.Points:
      return formatPoints(log.wins, log.losses, log.draws, log.byes).toString();
    default:
      /* standard value handling */
      return log[standingsKey].toString();
  }
}

export type ColumnsType = "basic" | "complete";

const BasicColumns: StandingsKeyType[] = [
  StandingsKey.Played,
  StandingsKey.Wins,
  StandingsKey.Losses,
  StandingsKey.Draws,
  StandingsKey.Byes,
  StandingsKey.Points,
] as const;

const CompleteColumns: StandingsKeyType[] = [
  StandingsKey.Played,
  StandingsKey.Wins,
  StandingsKey.Losses,
  StandingsKey.Draws,
  StandingsKey.Byes,
  StandingsKey.Forfeits,
  StandingsKey.WinPercent,
  StandingsKey.PointsDiff,
  StandingsKey.Points,
] as const;

export const ColumnsMap = new Map<ColumnsType, Array<StandingsKeyType>>()
  .set("basic",    BasicColumns)
  .set("complete", CompleteColumns);
