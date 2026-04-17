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
  Statistics: "statistics",
  Logout:     "logout",
}

const getQK = (baseQK: string[], id?: number): Array<string|number> => {
  const [ all, byId ] = baseQK;
  return (id && id > 0)
    ? [byId, { id }]
    : [all];
}

export const getSeasonsQK = (id?: number): Array<string|number> => {
  return getQK([queryKeys.Seasons, queryKeys.Season], id);
};

export const getDivisionsQK = (id?: number): Array<string|number> => {
  return getQK([queryKeys.Divisions, queryKeys.Division], id);
};

export const getTeamsQK = (id?: number): Array<string|number> => {
  return getQK([queryKeys.Teams, queryKeys.Team], id);
}

export const getPlayersQK = (id?: number): Array<string|number> => {
  return getQK([queryKeys.Players, queryKeys.Player], id);
};

export const getGamesQK = (id?: number): Array<string|number> => {
  return getQK([queryKeys.Games, queryKeys.Game], id);
};

export const getStatisticsQK = (id?: number): Array<string|number> => {
  return getQK([queryKeys.Statistics, queryKeys.Statistics], id); /* seasonId */
};
