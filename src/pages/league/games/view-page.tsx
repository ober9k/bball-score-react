import type { GameLoaderProps } from "@/apis/loaders/types.ts";
import GameCard from "@/components/games/game-card.tsx";
import { StatsRow } from "@/components/stats/stats-row.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { calculateTotals } from "@/lib/stats-utils.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { Game, TeamLogWithTotals } from "@/types/game.ts";
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

  const teamLogs: TeamLogWithTotals[] = game.teamLogs
    .map((tl) => ({
      ...tl,
      totals: calculateTotals(tl.playerLogs),
    }));

  return (
    <>
      <GameCard game={game} />
      {teamLogs.map((teamLog, index) => (
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
              {teamLog.playerLogs.map(({ player, stats }) => (
                <StatsRow key={player.id} player={player} stats={stats} />
              ))}
            </TableBody>
            <TableFooter>
              <StatsRow totals={true} stats={teamLog.totals} />
            </TableFooter>
          </Table>
        </Fragment>
      ))}
    </>
  );
}

export { ViewPage as GamesViewPage };
