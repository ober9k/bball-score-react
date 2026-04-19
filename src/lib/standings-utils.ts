import type { StandingsLog } from "@/types/standings-log.ts";

const WinPercentPrecision = 3;
const PointsDiffPrecision = 1;

export function getWinPercent(log: StandingsLog): string {
  return (log.wins / log.played)
    .toFixed(WinPercentPrecision);
}

export function getPointsDiff(log: StandingsLog): string {
  const diff = ((log.pointsFor - log.pointsAgainst) / log.played);
  const prefix = (diff > 0) ? "+" : "";
  const diffValue = diff.toFixed(PointsDiffPrecision);

  return `${prefix}${diffValue}`;
}

export function getPoints(log: StandingsLog): number {
  return (log.wins * 3) + (log.draws * 2) + (log.losses) + (log.byes);
}
