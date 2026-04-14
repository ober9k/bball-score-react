export const queryKeys = {
  Seasons:   "seasons",
  Divisions: "divisions",
  Teams:     "teams",
  Players:   "players",
  Games:     "games",
  Logout:    "logout",
}

const getQK = (baseQK: string, id?: number): Array<string|number> => {
  return (id && id > 0)
    ? [baseQK, { id }]
    : [baseQK];
}

export const getSeasonsQK = (id?: number): Array<string|number> => {
  return getQK(queryKeys.Seasons, id);
};

export const getDivisionsQK = (id?: number): Array<string|number> => {
  return getQK(queryKeys.Divisions, id);
};

export const getTeamsQK = (id?: number): Array<string|number> => {
  return getQK(queryKeys.Teams, id);
}

export const getPlayersQK = (id?: number): Array<string|number> => {
  return getQK(queryKeys.Players, id);
};

export const getGamesQK = (id?: number): Array<string|number> => {
  return getQK(queryKeys.Games, id);
};
