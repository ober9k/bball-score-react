import type { Team } from "@/types/team.ts";

export const StandingsKey = {
  Played:      "played",
  Wins:        "wins",
  Losses:      "losses",
  Draws:       "draws",
  Byes:        "byes",
  Forfeits:    "forfeits",
  WinPercent:  "winPercent",
  PointsDiff:  "pointsDiff",
  Points:      "points",
} as const;

export type StandingsKeyType = typeof StandingsKey[keyof typeof StandingsKey];

export type StandingsLog = {
  id:            number,
  team:          Team,
  played:        number,
  wins:          number,
  losses:        number,
  draws:         number,
  byes:          number,
  forfeits:      number,
  pointsFor:     number,
  pointsAgainst: number,
};
