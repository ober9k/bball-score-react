import type { PositionType } from "@/types/player/position.ts";

export type Player = {
  id: number,
  name: string,
  position: PositionType,
  number: number,
  height: string,
}
