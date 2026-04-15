export type Season = {
  id:   number,
  name: string,
};

export type UpdateSeasonDto = Omit<Season, "id">;
