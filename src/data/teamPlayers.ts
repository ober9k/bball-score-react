import type { Player } from "../types/Player.ts";
import type { Team } from "../types/Team.ts";
import type { TeamPlayer } from "../types/TeamPlayer.ts";
import { mockPlayers } from "./players.ts";
import { tempFindTeamById } from "./teams.ts";

export const mockTeamPlayers: Array<TeamPlayer> = [
  { teamId: 10, playerId: 11 },
  { teamId: 10, playerId: 12 },
  { teamId: 10, playerId: 13 },
  { teamId: 10, playerId: 14 },
  { teamId: 10, playerId: 15 },
  { teamId: 11, playerId: 21 },
  { teamId: 11, playerId: 22 },
  { teamId: 11, playerId: 23 },
  { teamId: 11, playerId: 24 },
  { teamId: 11, playerId: 25 },
];
