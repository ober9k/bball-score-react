import type { Activatable, Archivable } from "@/types/base";

export const Position = {
  PointGuard:    "POINT_GUARD",
  ShootingGuard: "SHOOTING_GUARD",
  SmallForward:  "SMALL_FORWARD",
  PowerForward:  "POWER_FORWARD",
  Center:        "CENTER",
} as const;

export type PositionType = typeof Position[keyof typeof Position];

export type Player = {
  id:       number,
  name:     string,
  position: PositionType,
  number:   string,
  height:   string,
  active:   boolean,
  archived: boolean,
  leagueId: number,
};

export type BriefPlayer = {
  id:       number,
  name:     string,
  position: PositionType,
  number:   string,
  height:   string,
  leagueId: number,
} & Activatable & Archivable;

export type BriefPlayerData = Omit<BriefPlayer, "id">;

export type UpdatePlayerDto = Omit<Player, "id">; /* to be removed */
