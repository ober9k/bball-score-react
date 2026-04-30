import type { BriefDivision } from "@/types/division.ts";
import type { BriefGame } from "@/types/game.ts";
import type { BriefPlayer } from "@/types/player.ts";
import type { BriefSeason } from "@/types/season.ts";
import type { BriefTeam } from "@/types/team.ts";

export type ManageSeasonsAllLoaderProps = {
  seasons: BriefSeason[],
};

export type ManageSeasonsByIdLoaderProps = {
  season: BriefSeason,
};

export type ManageDivisionsAllLoaderProps = {
  divisions: BriefDivision[],
};

export type ManageDivisionsByIdLoaderProps = {
  division: BriefDivision,
};

export type ManageTeamsAllLoaderProps = {
  teams: BriefTeam[],
};

export type ManageTeamsByIdLoaderProps = {
  team: BriefTeam,
};

export type ManagePlayersAllLoaderProps = {
  players: BriefPlayer[],
};

export type ManagePlayersByIdLoaderProps = {
  player: BriefPlayer,
};

export type ManageGamesAllLoaderProps = {
  games: BriefGame[],
};

export type ManageGamesByIdLoaderProps = {
  game: BriefGame,
};
