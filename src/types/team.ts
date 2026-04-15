export type Team = {
  id:         number,
  name:       string,
  shortName:  string,
  divisionId: number,
};

export type UpdateTeamDto = Omit<Team, "id">;
