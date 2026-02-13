export const PlayerPosition = {
  PointGuard: "pointGuard",
  ShootingGuard: "shootingGuard",
  SmallForward: "smallForward",
  PowerForward: "powerForward",
  Center: "center",
} as const;

export type PlayerPosition = typeof PlayerPosition[keyof typeof PlayerPosition];
