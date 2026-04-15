export type Division = {
  id:       number,
  name:     string,
  seasonId: number,
};

export type UpdateDivisionDto = Omit<Division, "id">;
