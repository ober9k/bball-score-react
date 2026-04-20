export type Division = {
  id:       number,
  name:     string,
  active:   boolean,
  archived: boolean,
  seasonId: number,
};

export type UpdateDivisionDto = Omit<Division, "id">;
