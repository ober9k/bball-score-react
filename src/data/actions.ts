import type { Team } from "../types/Team.ts";

export type TeamData = Pick<Team, "id" | "name" | "teamStyle">;
