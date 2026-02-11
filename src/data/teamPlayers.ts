import type { Player } from "../types/Player.ts";
import type { Team } from "../types/Team.ts";
import type { TeamPlayer } from "../types/TeamPlayer.ts";
import { mockPlayers } from "./players.ts";
import { tempFindTeamById } from "./teams.ts";

export const mockTeamPlayers: Array<TeamPlayer> = [
  { teamId: 11, playerId: 11 },
  { teamId: 11, playerId: 12 },
  { teamId: 11, playerId: 13 },
  { teamId: 11, playerId: 14 },
  { teamId: 11, playerId: 15 },
  { teamId: 12, playerId: 21 },
  { teamId: 12, playerId: 22 },
  { teamId: 12, playerId: 23 },
  { teamId: 12, playerId: 24 },
  { teamId: 12, playerId: 25 },
];

export function findPlayersByTeamId(teamId: number): Array<Player> {
  const teamPlayerIds = mockTeamPlayers
    .filter((teamPlayer) => teamPlayer.teamId === teamId)
    .map((teamPlayer) => teamPlayer.playerId);

  return mockPlayers.filter((player) => teamPlayerIds.includes(player.id));
}

export function findTeamByPlayerId(playerId: number): Team | undefined {
  const teamId = mockTeamPlayers
    .filter((teamPlayer) => teamPlayer.playerId === playerId)
    .map((teamPlayer) => teamPlayer.teamId)
    .pop();

  return tempFindTeamById(teamId);
}
