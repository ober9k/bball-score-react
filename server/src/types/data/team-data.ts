import type { Team } from "@types/team";

/**
 Only pick form fields.
 */
export type TeamData = Pick<Team, "name" | "teamStyle">;

/**
 * Only pick form fields with the additional ID provided.
 */
export type CreateTeamData = Pick<Team, "id" | "name" | "teamStyle">;
