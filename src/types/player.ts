import type { PositionType } from "@/types/player/position.ts";

export type Player = {
  name: string,
  position: PositionType,
  number: number,
  height: string,
}

/* TODO: to be tidied up */
export type PlayerData = {
  name: string,
  position: PositionType,
  number: number,
  height: string,
}

/* TODO: to be tidied up */
export type PlayerDataWithId = {
  id: number,
  name: string,
  position: PositionType,
  number: number,
  height: string,
}

