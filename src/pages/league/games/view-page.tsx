import type { GameLoaderProps } from "@/apis/loaders/types.ts";
import GameCard from "@/components/games/game-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { Game } from "@/types/game.ts";
import { getRouteApi } from "@tanstack/react-router";
import { Fragment } from "react";

export default function ViewPage() {
  const { game }: GameLoaderProps = getRouteApi(leaguePaths.Games.View).useLoaderData();

  useTitle("Game", `#${game.id}`); /* gameId for now */
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Games", to: leaguePaths.Games.Index },
    { title: "Game" },
  ]);

  const initialAccumulator = {
    seconds:      0,
    // temp start
    fgMade:       0,
    fgAttempted:  0,
    fg3Made:      0,
    fg3Attempted: 0,
    ftMade:       0,
    ftAttempted:  0,
    // temp finish
    offRebounds:  0,
    defRebounds:  0,
    rebounds:     0,
    assists:      0,
    steals:       0,
    blocks:       0,
    turnovers:    0,
    points:       0,
  };

  const statsReducer = (acc, cur) => {
    return {
      seconds:      0,
      // temp start
      fgMade:       acc.fgMade + cur.fgMade,
      fgAttempted:  acc.fgAttempted + cur.fgAttempted,
      fg3Made:      acc.fg3Made + cur.fg3Made,
      fg3Attempted: acc.fg3Attempted + cur.fg3Attempted,
      ftMade:       acc.ftMade + cur.ftMade,
      ftAttempted:  acc.ftAttempted + cur.ftAttempted,
      // temp finish
      offRebounds:  acc.offRebounds + cur.offRebounds,
      defRebounds:  acc.defRebounds + cur.defRebounds,
      rebounds:     acc.rebounds + cur.rebounds,
      assists:      acc.assists + cur.assists,
      steals:       acc.steals + cur.steals,
      blocks:       acc.blocks + cur.blocks,
      turnovers:    acc.turnovers + cur.turnovers,
      points:       acc.points + cur.points,
    }
  };

  const formatMinutes = (seconds: number) => {
    return (new Intl.DateTimeFormat(navigator.language, {
      minute: '2-digit',
      second: '2-digit',
    })).format(new Date(0, 0, 0, 0, 0, seconds));
  };

  /* playerLogs needs to be updated */
  const teamsLogs = game.teamLogs.map((teamLog) => ({
    team: teamLog.team,
    playerLogs: (teamLog as any).playerLogs.map((gtp) => ({
      player:       gtp.player,
      seconds:      formatMinutes(gtp.seconds),
      // temp start
      fgMade:       gtp.fgMade,
      fgAttempted:  gtp.fgAttempted,
      fg3Made:      gtp.fg3Made,
      fg3Attempted: gtp.fg3Attempted,
      ftMade:       gtp.ftMade,
      ftAttempted:  gtp.ftAttempted,
      // temp finish
      offRebounds:  gtp.offRebounds,
      defRebounds:  gtp.defRebounds,
      rebounds:     gtp.rebounds,
      assists:      gtp.assists,
      steals:       gtp.steals,
      blocks:       gtp.blocks,
      turnovers:    gtp.turnovers,
      points:       gtp.points,
    })),
    totals: (teamLog as any).playerLogs.reduce(statsReducer, { ...initialAccumulator })
  }));

  return (
    <>
      <GameCard game={game} />
      {teamsLogs.map((teamLog, index) => (
        <Fragment key={index}>
          <h2 className="p-2 pt-4 font-medium">{teamLog.team.name}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead className="w-[24px] px-1 text-center">MIN</TableHead>
                <TableHead className="w-[30px] px-1 text-center">FG</TableHead>
                <TableHead className="w-[30px] px-1 text-center">3PT</TableHead>
                <TableHead className="w-[30px] px-1 text-center">FT</TableHead>
                <TableHead className="w-[24px] px-1 text-center">OREB</TableHead>
                <TableHead className="w-[24px] px-1 text-center">DREB</TableHead>
                <TableHead className="w-[24px] px-1 text-center">REB</TableHead>
                <TableHead className="w-[24px] px-1 text-center">AST</TableHead>
                <TableHead className="w-[24px] px-1 text-center">STL</TableHead>
                <TableHead className="w-[24px] px-1 text-center">BLK</TableHead>
                <TableHead className="w-[24px] px-1 text-center">TOV</TableHead>
                <TableHead className="w-[24px] px-1 text-center">PTS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamLog.playerLogs.map((pl, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{pl.player.name}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.seconds}</TableCell>
                  <TableCell className="w-[30px] px-1 text-center">{pl.fgMade}-{pl.fgAttempted}</TableCell>
                  <TableCell className="w-[30px] px-1 text-center">{pl.fg3Made}-{pl.fg3Attempted}</TableCell>
                  <TableCell className="w-[30px] px-1 text-center">{pl.ftMade}-{pl.ftAttempted}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.offRebounds}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.defRebounds}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.rebounds}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.assists}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.steals}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.blocks}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.turnovers}</TableCell>
                  <TableCell className="w-[24px] px-1 text-center">{pl.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Totals</TableCell>
                <TableCell className="text-center">---</TableCell>
                <TableCell className="text-center">{teamLog.totals.fgMade}-{teamLog.totals.fgAttempted}</TableCell>
                <TableCell className="text-center">{teamLog.totals.fg3Made}-{teamLog.totals.fg3Attempted}</TableCell>
                <TableCell className="text-center">{teamLog.totals.ftMade}-{teamLog.totals.ftAttempted}</TableCell>
                <TableCell className="text-center">{teamLog.totals.offRebounds}</TableCell>
                <TableCell className="text-center">{teamLog.totals.defRebounds}</TableCell>
                <TableCell className="text-center">{teamLog.totals.rebounds}</TableCell>
                <TableCell className="text-center">{teamLog.totals.assists}</TableCell>
                <TableCell className="text-center">{teamLog.totals.steals}</TableCell>
                <TableCell className="text-center">{teamLog.totals.blocks}</TableCell>
                <TableCell className="text-center">{teamLog.totals.turnovers}</TableCell>
                <TableCell className="text-center">{teamLog.totals.points}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Fragment>
      ))}
    </>
  );
}

export { ViewPage as GamesViewPage };
