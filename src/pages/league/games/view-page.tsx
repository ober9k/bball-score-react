import type { GameLoaderProps } from "@/apis/loaders/types.ts";
import GameCard from "@/components/games/game-card.tsx";
import { StatsRow, StatsTitleCell } from "@/components/stats/stats-row.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { calculateTotals } from "@/lib/stats-utils.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { Game, TeamLogWithTotals } from "@/types/game.ts";
import { StatsKey } from "@/types/stats.ts";
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
                <StatsTitleCell statsKey={StatsKey.Minutes} />
                <StatsTitleCell statsKey={StatsKey.FieldGoals} />
                <StatsTitleCell statsKey={StatsKey.ThreePointFieldGoals} />
                <StatsTitleCell statsKey={StatsKey.FreeThrows} />
                <StatsTitleCell statsKey={StatsKey.Rebounds} />
                <StatsTitleCell statsKey={StatsKey.Assists} />
                <StatsTitleCell statsKey={StatsKey.Steals} />
                <StatsTitleCell statsKey={StatsKey.Blocks} />
                <StatsTitleCell statsKey={StatsKey.Turnovers} />
                <StatsTitleCell statsKey={StatsKey.PersonalFouls} />
                <StatsTitleCell statsKey={StatsKey.Points} />
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
