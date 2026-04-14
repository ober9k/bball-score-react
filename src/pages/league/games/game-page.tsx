import GameCard from "@/components/games/game-card.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { gamesPaths } from "@/routes/league/games/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { Game } from "@/types/game.ts";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Fragment } from "react";

type LoaderProps = {
  game: Game, /* TBD for using types */
}

export default function GamePage() {
  const { game }: LoaderProps = getRouteApi(gamesPaths.Game).useLoaderData();

  useTitle("Game", `#${game.id}`); /* gameId for now */
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League },
    { title: "Games", to: gamesPaths.Games },
    { title: "Game" },
  ]);

  const [ awayTeam, homeTeam ] = (game as any).gameTeams;
  const { gameTeamPlayers: awayTeamPlayers } = awayTeam;
  const { gameTeamPlayers: homeTeamPlayers } = homeTeam;

  const initialAccumulator = {
    points:   0,
    rebounds: 0,
    assists:  0,
    steals:   0,
    blocks:   0,
  };

  const statsReducer = (acc, cur) => {
    return {
      points:   acc.points + cur.points,
      rebounds: acc.rebounds + cur.rebounds,
      assists:  acc.assists + cur.assists,
      steals:   acc.steals + cur.steals,
      blocks:   acc.blocks + cur.blocks,
    }
  };


  game.teamLogs = (game as any).gameTeams; /* temp */

  const teamsLogs = game.teamLogs.map((teamLog) => ({
    team: teamLog.team,
    playerLogs: (teamLog as any).gameTeamPlayers.map((gtp) => ({
      player:   gtp.player,
      rebounds: gtp.rebounds,
      assists:  gtp.assists,
      steals:   gtp.steals,
      blocks:   gtp.blocks,
      points:   gtp.points,
    })),
    totals: (game.teamLogs[0] as any).gameTeamPlayers.reduce(statsReducer, { ...initialAccumulator })
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
                <TableHead className="w-[40px] text-center">REB</TableHead>
                <TableHead className="w-[40px] text-center">AST</TableHead>
                <TableHead className="w-[40px] text-center">STL</TableHead>
                <TableHead className="w-[40px] text-center">BLK</TableHead>
                <TableHead className="w-[40px] text-center">PTS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamLog.playerLogs.map((pl, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{pl.player.name}</TableCell>
                  <TableCell className="text-center">{pl.rebounds}</TableCell>
                  <TableCell className="text-center">{pl.assists}</TableCell>
                  <TableCell className="text-center">{pl.steals}</TableCell>
                  <TableCell className="text-center">{pl.blocks}</TableCell>
                  <TableCell className="text-center">{pl.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Totals</TableCell>
                <TableCell className="text-center">{teamLog.totals.rebounds}</TableCell>
                <TableCell className="text-center">{teamLog.totals.assists}</TableCell>
                <TableCell className="text-center">{teamLog.totals.steals}</TableCell>
                <TableCell className="text-center">{teamLog.totals.blocks}</TableCell>
                <TableCell className="text-center">{teamLog.totals.points}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Fragment>
      ))}
    </>
  );
}
