export const queryKeys = {
  Divisions: "divisions",
  Division:  "division",
  Games:     "games",
  Game:      "game",
  Players:   "players",
  Player:    "player",
  seasons:   "seasons",
  season:    "season",
  teams:     "teams",
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
  return getQK(queryKeys.seasons, id);
};

