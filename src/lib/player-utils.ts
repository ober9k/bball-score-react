import { i18n } from "@/lib/phrases";
import { Position, type PositionType } from "@/types/player";

const fullPositionMap = new Map<PositionType, string>()
  .set(Position.PointGuard,    i18n("position.type.label.pointGuard"))
  .set(Position.ShootingGuard, i18n("position.type.label.shootingGuard"))
  .set(Position.SmallForward,  i18n("position.type.label.smallForward"))
  .set(Position.PowerForward,  i18n("position.type.label.powerForward"))
  .set(Position.Center,        i18n("position.type.label.center"));

const shortPositionMap = new Map<PositionType, string>()
  .set(Position.PointGuard,    i18n("position.type.label.guard"))
  .set(Position.ShootingGuard, i18n("position.type.label.guard"))
  .set(Position.SmallForward,  i18n("position.type.label.forward"))
  .set(Position.PowerForward,  i18n("position.type.label.forward"))
  .set(Position.Center,        i18n("position.type.label.center"));

export function getPositionLabel(position: PositionType, fullPosition = false): string {
  return (fullPosition)
    ? fullPositionMap.get(position) || ""
    : shortPositionMap.get(position) || "";
}

export function asPositionType(position: string): PositionType {
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
