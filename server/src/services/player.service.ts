import HttpException from "@models/http-exception.model";
import { findByTeamId } from "@services/team.service";
import type { Player } from "@types/player";
import type { Team } from "@types/Team";
import { mockPlayers } from "../../../src/data/players";
import { mockTeamPlayers } from "../../../src/data/teamPlayers";

/**
 * TODO: referencing mock data for now.
 */
export function findAll(): Array<Player> {
  return mockPlayers;
}

/**
 * TODO: referencing mock data for now.
 */
export function findByPlayerId(playerId: number): Player {
  const player = mockPlayers.find((player) => player.id === playerId);

  if (!player) {
    throw new HttpException(404, "NotFound", "Unable to find player with `playerId` provided.");
  }

  return player;
}

/**
 * TODO: referencing mock data for now.
 */
export function findTeamByPlayerId(playerId: number): Team {
  const teamId = mockTeamPlayers
    .filter((teamPlayer) => teamPlayer.playerId === playerId)
    .map((teamPlayer) => teamPlayer.teamId)
    .pop();

  return findByTeamId(teamId);
}
