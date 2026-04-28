import { Position } from "@/types/player.ts";
import type { PositionType } from "@/types/player.ts";

export function mapPosition(position: string): PositionType {
  switch (position) {
    case "POINT_GUARD":    return Position.PointGuard;
    case "SHOOTING_GUARD": return Position.ShootingGuard;
    case "SMALL_FORWARD":  return Position.SmallForward;
    case "POWER_FORWARD":  return Position.PowerForward;
    case "CENTER":         return Position.Center;
    default:
      throw Error("Unexpected `position` provided.");
  }
}
