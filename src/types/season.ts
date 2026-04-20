export type Season = {
  id:       number,
  name:     string,
  active:   boolean,
  archived: boolean,
};

export type UpdateSeasonDto = Omit<Season, "id">;
