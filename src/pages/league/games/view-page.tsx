import type { GameLoaderProps } from "@/apis/loaders/types.ts";
import GameCard from "@/components/games/game-card.tsx";
import { StatsValuesRow } from "@/components/stats/stats-values-row.tsx";
import { StatsTitlesRow } from "@/components/stats/stats-titles-row.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { calculateTotals } from "@/lib/stats-utils.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableFooter, TableHeader } from "@/shared/components/ui/table.tsx";
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
              <StatsTitlesRow />
            </TableHeader>
            <TableBody>
              {teamLog.playerLogs.map(({ player, stats }) => (
                <StatsValuesRow key={player.id} player={player} stats={stats} />
              ))}
            </TableBody>
            <TableFooter>
              <StatsValuesRow totals={true} stats={teamLog.totals} />
            </TableFooter>
          </Table>
        </Fragment>
      ))}
    </>
  );
}

export { ViewPage as GamesViewPage };
