import { Position, type PositionType } from "../types/Position.ts";

const basePositions = new Map<PositionType, string>()
  .set(Position.PointGuard, "Guard")
  .set(Position.ShootingGuard, "Guard")
  .set(Position.SmallForward, "Forward")
  .set(Position.PowerForward, "Forward")
  .set(Position.Center, "Center");

const fullPositions = new Map<PositionType, string>()
  .set(Position.PointGuard, "Point Guard")
  .set(Position.ShootingGuard, "Shooting Guard")
  .set(Position.SmallForward, "Small Forward")
  .set(Position.PowerForward, "Power Forward")
  .set(Position.Center, "Center");

export function mapBasePosition(position: PositionType) {
  return basePositions.get(position);
}
export function mapFullPosition(position: PositionType) {
  return fullPositions.get(position);
}
