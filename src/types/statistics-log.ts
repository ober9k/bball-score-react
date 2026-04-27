import type { Game } from "@/types/game.ts";
import type { Player } from "@/types/player";
import type { Season } from "@/types/season.ts";
import type { Stats } from "@/types/stats";
import type { Team } from "@/types/team";

export type StatisticsLog = {
  id:      number,
  team:    Team,
  player:  Player,
  played:  number,
  started: number,
  stats:   Stats,
  /* temp */
  season?: Season,
  game?: Game,
}
