import * as styles from "@/components/stats/stats-row.module.css";
import { formatValue, getStatsTitle } from "@/lib/stats-utils.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { TableCell, TableHead, TableRow } from "@/shared/components/ui/table.tsx";
import type { Player } from "@/types/player.ts";
import type { Stats } from "@/types/stats.ts";
import { StatsKey, type StatsKeyType } from "@/types/stats.ts";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react";

type StatsTitleCellProps = {
  statsKey: StatsKeyType,
};

export function StatsTitleCell(props: StatsTitleCellProps) {
  const { statsKey } = props;

  const cellClass = ([StatsKey.FieldGoals, StatsKey.TwoPointFieldGoals, StatsKey.ThreePointFieldGoals, StatsKey.FreeThrows].includes(statsKey))
    ? styles.statsWideTitleCell
    : styles.statsTitleCell;

  const cellValue = getStatsTitle(statsKey);

  return (
    <Fragment>
      <TableHead className={cellClass}>{cellValue}</TableHead>
    </Fragment>
  );
}

export type StatsCellProps = {
  stats:     Stats,
  statsKey:  StatsKeyType,
  averages?: boolean,
};

function StatsCell(props: StatsCellProps) {
  const { stats, statsKey, averages = false } = props;

  const cellClass = ([StatsKey.Points].includes(statsKey))
    ? styles.statsLabelCell
    : styles.statsValueCell;

  const cellValue = (averages)
    ? formatValue(stats, statsKey, 1) /* 1 decimal point for averages */
    : formatValue(stats, statsKey);

  return (
    <Fragment>
      <TableCell className={cellClass}>{cellValue}</TableCell>
    </Fragment>
  );
}

type StatsRowProps = {
  player?:   Player,
  played?:   number,
  totals?:   boolean,
  averages?: boolean,
  stats:     Stats,
};

function calcAverageStats(stats: Stats, played: number): Stats {
  return {
    seconds:        stats.seconds / played,
    fgMade:         stats.fgMade / played,
    fgAttempted:    stats.fgAttempted / played,
    fg3Made:        stats.fg3Made / played,
    fg3Attempted:   stats.fg3Attempted / played,
    ftMade:         stats.ftMade / played,
    ftAttempted:    stats.ftAttempted / played,
    points:         stats.points / played,
    offRebounds:    stats.offRebounds / played,
    defRebounds:    stats.defRebounds / played,
    rebounds:       stats.rebounds / played,
    assists:        stats.assists / played,
    steals:         stats.steals / played,
    blocks:         stats.blocks / played,
    turnovers:      stats.turnovers / played,
    personalFouls:  stats.personalFouls / played,
    technicalFouls: stats.technicalFouls / played,
  } as Stats;
}

export function StatsRow(props: StatsRowProps) {
  const { player, totals, averages = false, stats } = props;

  return (
    <Fragment>
      <TableRow>
        <TableCell className="font-medium">
          {player && (
            <Link to={leaguePaths.Players.View} params={{ playerId: player.id }}>
              {player.name}
            </Link>
          )}
          {totals && ("Totals")}
        </TableCell>
        {(player && stats.seconds === 0) ? (
          <Fragment>
            <TableCell className={styles.statsValueCell} colSpan={99}>DNP &ndash; DID NOT PLAY</TableCell>
          </Fragment>
        ) : (
          <Fragment>
            <StatsCell stats={stats} statsKey={StatsKey.Minutes} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.FieldGoals} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.ThreePointFieldGoals} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.FreeThrows} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.Rebounds} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.Assists} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.Steals} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.Blocks} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.Turnovers} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.PersonalFouls} averages={averages} />
            <StatsCell stats={stats} statsKey={StatsKey.Points} averages={averages} />
          </Fragment>
        )}
      </TableRow>
    </Fragment>
  );
}
