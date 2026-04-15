import type { Division } from "@/types/division.ts";
import type { Player } from "@/types/player.ts";
import type { Season } from "@/types/season.ts";
import type { Team } from "@/types/team.ts";

export type SeasonsLoaderProps = {
  seasons: Season[],
};

export type SeasonLoaderProps = {
  season: Season,
};

export type DivisionsLoaderProps = {
  divisions: Division[],
};

export type DivisionLoaderProps = {
  division: Division,
};

export type TeamsLoaderProps = {
  teams: Team[],
};

export type TeamLoaderProps = {
  team: Team,
};

export type PlayersLoaderProps = {
  players: Player[],
};

export type PlayerLoaderProps = {
  player: Player,
};
