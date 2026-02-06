import type { Averages } from "../types/stats/Averages.ts";
import type { Totals } from "../types/stats/Totals.ts";

/**
 * Iterate through logs to calculate the totals.
 * Todo: iterate over the object instead
 * @param logs
 */
export function getTotals(logs: Array<Totals>): Totals {
  const totals = {
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    personalFouls: 0,
    turnovers: 0,
  };

  return logs.reduce((acc: Totals, cur) => {
    acc.points        += cur.points;
    acc.rebounds      += cur.rebounds;
    acc.assists       += cur.assists;
    acc.steals        += cur.steals;
    acc.blocks        += cur.blocks;
    acc.personalFouls += cur.personalFouls;
    acc.turnovers     += cur.turnovers;

    return acc;
  }, totals)
}

/**
 * Calculate the averages using games played and calculated totals.
 * Todo: iterate over the object instead
 * @param logs
 */
export function getAverages(logs: Array<Totals>): Averages {
  const totals = getTotals(logs);
  const played = logs.length; /* also consider played */

  return {
    points:        totals.points / played,
    rebounds:      totals.rebounds / played,
    assists:       totals.assists / played,
    steals:        totals.steals / played,
    blocks:        totals.blocks / played,
    personalFouls: totals.personalFouls / played,
    turnovers:     totals.turnovers / played,
  };
}
