export const Side = {
  AWAY_TEAM: "AWAY_TEAM",
  HOME_TEAM: "HOME_TEAM",
} as const;

export type SideType = typeof Side[keyof typeof Side];
