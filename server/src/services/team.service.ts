import type { Player } from "@types/player";
import type { Team } from "@types/Team";
import type { TeamData } from "../../../src/data/actions";
import { mockPlayers } from "../../../src/data/players";
import { mockTeamPlayers } from "../../../src/data/teamPlayers";
import { mockTeams } from "../../../src/data/teams";
import HttpException from "@models/http-exception.model";

/**
 * TODO: referencing mock data for now.
 */
export function findAll(): Array<Team> {
  return mockTeams;
}

/**
 * TODO: referencing mock data for now.
 */
export function findByTeamId(teamId: number): Team {
  const team = mockTeams.find((team) => team.id === teamId);

  if (!team) {
    throw new HttpException(404, "NotFound", "Unable to find team with `teamId` provided.");
  }

  return team;
}

/**
 * TODO: referencing mock data for now.
 */
export function updateByTeamId(teamId: number, data: TeamData): Team {
  const team = findByTeamId(teamId);

  // include invalid data checks
  // updating array data for now
  team.name = data.name;
  team.teamStyle = {
    bgColor:   data.teamStyle.bgColor,
    textColor: data.teamStyle.textColor,
  };

  return team;
}

/**
 * TODO: referencing mock data for now.
 */
export function findTeamPlayersById(teamId: number): Array<Player> {
  const teamPlayerIds = mockTeamPlayers
    .filter((teamPlayer) => teamPlayer.teamId === teamId)
    .map((teamPlayer) => teamPlayer.playerId);

  return mockPlayers.filter((player) => teamPlayerIds.includes(player.id));
}
