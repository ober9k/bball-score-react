/**
 * Special keys used for handling formatting and rendering.
 */
export const StatsKey = {
  Minutes:              "minutes",
  FieldGoals:           "fieldGoals",  /* all field goals */
  TwoPointFieldGoals:   "twoPointFieldGoals",   /* only 2 point field goals */
  ThreePointFieldGoals: "threePointFieldGoals", /* only 3 point field goals */
  FreeThrows:           "freeThrows",
  OffensiveRebounds:    "offensiveRebounds",
  DefensiveRebounds:    "defensiveRebounds",
  Rebounds:             "rebounds",
  Assists:              "assists",
  Steals:               "steals",
  Blocks:               "blocks",
  Turnovers:            "turnovers",
  PersonalFouls:        "personalFouls",
  TechnicalFouls:       "technicalFouls",
  Points:               "points",
} as const;

export type StatsKeyType = typeof StatsKey[keyof typeof StatsKey];

export type Stats = {
  seconds:        number,
  fgMade:         number,
  fgAttempted:    number,
  fg3Made:        number,
  fg3Attempted:   number,
  ftMade:         number,
  ftAttempted:    number,
  points:         number,
  offRebounds:    number,
  defRebounds:    number,
  rebounds:       number,
  assists:        number,
  steals:         number,
  blocks:         number,
  turnovers:      number,
  personalFouls:  number,
  technicalFouls: number,
};
