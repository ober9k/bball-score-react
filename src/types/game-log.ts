import type { Stats } from "@/types/stats";
import type { TeamLog } from "@/types/game";

export type GameLog = {
  id:           number,
  date:         Date,
  stats:        Stats,
  playerTeam:   TeamLog,
  opposingTeam: TeamLog,
};
