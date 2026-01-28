export const Position = {
  PointGuard: "pointGuard",
  ShootingGuard: "shootingGuard",
  SmallForward: "smallForward",
  PowerForward: "powerForward",
  Center: "center",
} as const;

export type PositionType = typeof Position[keyof typeof Position];
