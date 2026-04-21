export const queryKeys = {
  Seasons:    "seasons",
  Season:     "season",
  Divisions:  "divisions",
  Division:   "division",
  Teams:      "teams",
  Team:       "team",
  Players:    "players",
  Player:     "player",
  Games:      "games",
  Game:       "game",
  Standings:  "standings",
  Statistics: "statistics",
  Logout:     "logout",
}

const getQK = (baseQK: string, id?: number): Array<string> => {
  return (id && id > 0)
    ? [baseQK, id.toString()]
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

export const getStandingsQK = (id?: number): Array<string|number> => {
  return getQK(queryKeys.Standings, id); /* seasonId */
};

export const getStatisticsQK = (id?: number): Array<string|number> => {
  return getQK(queryKeys.Statistics, id); /* seasonId */
};
