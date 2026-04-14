/* TODO: to be tidied up */
export type Team = {
  id: number,
  name: string,
  shortName: string,
}

/* TODO: to be tidied up */
export type TeamData = {
  name: string,
  shortName: string,
  divisionId: number,
}

/* TODO: to be tidied up */
export type TeamDataWithId = {
  id: number,
  name: string,
  shortName: string,
  divisionId: number,
}

/* TODO: to be tidied up */
export type TeamDto = {
  id?: number,
  name: string,
  shortName: string,
  divisionId: number,
}
