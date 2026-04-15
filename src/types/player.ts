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
  number:   number,
  height:   string,
};

export type UpdatePlayerDto = Omit<Player, "id">;
