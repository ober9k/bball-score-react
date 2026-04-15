import type { PlayerLog } from "@/types/game.ts";
import type { Stats } from "@/types/stats.ts";

/**
 * Format minutes display from the seconds.
 */
export function formatMinutes(seconds: number): string {
  return (new Intl.DateTimeFormat(navigator.language, {
    minute: '2-digit',
    second: '2-digit',
  })).format(new Date(0, 0, 0, 0, 0, seconds));
}

export function getInitialAccumulator(): Stats {
  return {
    seconds:       0,
    fgMade:        0,
    fgAttempted:   0,
    fg3Made:       0,
    fg3Attempted:  0,
    ftMade:        0,
    ftAttempted:   0,
    offRebounds:   0,
    defRebounds:   0,
    rebounds:      0,
    assists:       0,
    steals:        0,
    blocks:        0,
    turnovers:     0,
    personalFouls: 0,
    points:        0,
  };
}

/**
 * Calculate the totals from the player logs.
 * Ideally, this can just loop over all the properties.
 */
export function calculateTotals(playerLogs: PlayerLog[]): Stats {
  return playerLogs
    .map((pl) => ({ ...pl.stats }))
    .reduce((acc: Stats, cur: Stats) => ({
      seconds:       acc.seconds       + cur.seconds,
      fgMade:        acc.fgMade        + cur.fgMade,
      fgAttempted:   acc.fgAttempted   + cur.fgAttempted,
      fg3Made:       acc.fg3Made       + cur.fg3Made,
      fg3Attempted:  acc.fg3Attempted  + cur.fg3Attempted,
      ftMade:        acc.ftMade        + cur.ftMade,
      ftAttempted:   acc.ftAttempted   + cur.ftAttempted,
      offRebounds:   acc.offRebounds   + cur.offRebounds,
      defRebounds:   acc.defRebounds   + cur.defRebounds,
      rebounds:      acc.rebounds      + cur.rebounds,
      assists:       acc.assists       + cur.assists,
      steals:        acc.steals        + cur.steals,
      blocks:        acc.blocks        + cur.blocks,
      turnovers:     acc.turnovers     + cur.turnovers,
      personalFouls: acc.personalFouls + cur.personalFouls,
      points:        acc.points        + cur.points,
    }), getInitialAccumulator())
}
