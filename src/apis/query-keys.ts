export const queryKeys = {
  Divisions: "divisions",
  Division:  "division",
  Games:     "games",
  Game:      "game",
  Players:   "players",
  Player:    "player",
  Seasons:   "seasons",
  season:    "season",
  Teams:     "teams",
  team:      "team",
  Logout:    "logout",
  UsersMe:   "usersMe",
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
