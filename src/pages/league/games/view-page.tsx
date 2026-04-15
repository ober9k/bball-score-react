import type { GameLoaderProps } from "@/apis/loaders/types.ts";
import GameCard from "@/components/games/game-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { calculateTotals, formatMinutes } from "@/lib/stats-utils.ts";
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

  /* playerLogs needs to be updated */
  const teamsLogs = game.teamLogs.map((teamLog) => ({
    team: teamLog.team,
    playerLogs: (teamLog as any).playerLogs.map((gtp) => ({
      player:  gtp.player,
      minutes: formatMinutes(gtp.stats.seconds),
      stats:   gtp.stats,
    })),
    totals: calculateTotals(teamLog.playerLogs),
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
                <TableHead className="w-[36px] px-1 text-center">MIN</TableHead>
                <TableHead className="w-[36px] px-1 text-center">FG</TableHead>
                <TableHead className="w-[36px] px-1 text-center">3PT</TableHead>
                <TableHead className="w-[36px] px-1 text-center">FT</TableHead>
                <TableHead className="w-[32px] px-1 text-center">REB</TableHead>
                <TableHead className="w-[32px] px-1 text-center">AST</TableHead>
                <TableHead className="w-[32px] px-1 text-center">STL</TableHead>
                <TableHead className="w-[32px] px-1 text-center">BLK</TableHead>
                <TableHead className="w-[32px] px-1 text-center">TOV</TableHead>
                <TableHead className="w-[32px] px-1 text-center">PF</TableHead>
                <TableHead className="w-[32px] px-1 text-center">PTS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamLog.playerLogs.map((pl, index) => (
                <TableRow key={index} className="border-b-gray-200">
                  <TableCell className="font-medium">{pl.player.name}</TableCell>
                  <TableCell className="w-[36px] px-1 text-center">{pl.minutes}</TableCell>
                  <TableCell className="w-[36px] px-1 text-center">{pl.stats.fgMade}-{pl.stats.fgAttempted}</TableCell>
                  <TableCell className="w-[36px] px-1 text-center">{pl.stats.fg3Made}-{pl.stats.fg3Attempted}</TableCell>
                  <TableCell className="w-[36px] px-1 text-center">{pl.stats.ftMade}-{pl.stats.ftAttempted}</TableCell>
                  <TableCell className="w-[32px] px-1 text-center">{pl.stats.rebounds}</TableCell>
                  <TableCell className="w-[32px] px-1 text-center">{pl.stats.assists}</TableCell>
                  <TableCell className="w-[32px] px-1 text-center">{pl.stats.steals}</TableCell>
                  <TableCell className="w-[32px] px-1 text-center">{pl.stats.blocks}</TableCell>
                  <TableCell className="w-[32px] px-1 text-center">{pl.stats.turnovers}</TableCell>
                  <TableCell className="w-[32px] px-1 text-center">{pl.stats.personalFouls}</TableCell>
                  <TableCell className="w-[32px] px-1 text-center"><strong className="font-medium">{pl.stats.points}</strong></TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Totals</TableCell>
                <TableCell className="w-[36px] px-1 text-center">---</TableCell>
                <TableCell className="w-[36px] px-1 text-center">{teamLog.totals.fgMade}-{teamLog.totals.fgAttempted}</TableCell>
                <TableCell className="w-[36px] px-1 text-center">{teamLog.totals.fg3Made}-{teamLog.totals.fg3Attempted}</TableCell>
                <TableCell className="w-[36px] px-1 text-center">{teamLog.totals.ftMade}-{teamLog.totals.ftAttempted}</TableCell>
                <TableCell className="w-[32px] px-1 text-center">{teamLog.totals.rebounds}</TableCell>
                <TableCell className="w-[32px] px-1 text-center">{teamLog.totals.assists}</TableCell>
                <TableCell className="w-[32px] px-1 text-center">{teamLog.totals.steals}</TableCell>
                <TableCell className="w-[32px] px-1 text-center">{teamLog.totals.blocks}</TableCell>
                <TableCell className="w-[32px] px-1 text-center">{teamLog.totals.turnovers}</TableCell>
                <TableCell className="w-[32px] px-1 text-center">{teamLog.totals.personalFouls}</TableCell>
                <TableCell className="w-[32px] px-1 text-center"><strong className="font-medium">{teamLog.totals.points}</strong></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Fragment>
      ))}
    </>
  );
}

export { ViewPage as GamesViewPage };
