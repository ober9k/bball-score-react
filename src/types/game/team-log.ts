import type { SideType } from "@/types/game/side.ts";
import type { Player } from "@/types/player.ts";
import type { Team } from "@/types/team.ts";

export type TeamLog = {
  id: number,
  side: SideType,
  score: number,
  scoreByPeriod: number[],
  team: Team,
  teamPlayers: TeamPlayer[],
}

export type TeamPlayer = {
  teamId: number,
  playerId: number,
  team: Team,
  player: Player,
};
