export type Team = {
  id:         number,
  name:       string,
  shortName:  string,
  active:     boolean,
  archived:   boolean,
  divisionId: number,
};

export type UpdateTeamDto = Omit<Team, "id">;
