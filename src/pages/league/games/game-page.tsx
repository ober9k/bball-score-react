import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { gamesPaths } from "@/routes/league/games/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table.tsx";
import type { Game } from "@/types/game.ts";
import { getRouteApi, Link } from "@tanstack/react-router";

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

  const { points: awayPoints, rebounds: awayRebounds, assists: awayAssists, steals: awaySteals, blocks: awayBlocks } = awayTeamPlayers.reduce(statsReducer, { ...initialAccumulator });
  const { points: homePoints, rebounds: homeRebounds, assists: homeAssists, steals: homeSteals, blocks: homeBlocks } = homeTeamPlayers.reduce(statsReducer, { ...initialAccumulator });

  return (
    <>
      <p className="p-2 text-sm">
        <Link to={gamesPaths.Games}>
          Goto: Games
        </Link>
      </p>
      <h2 className="p-2 font-medium">Away Team Players</h2>
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
          {awayTeamPlayers.map((atp, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{atp.player.name}</TableCell>
              <TableCell className="text-center">{atp.rebounds}</TableCell>
              <TableCell className="text-center">{atp.assists}</TableCell>
              <TableCell className="text-center">{atp.steals}</TableCell>
              <TableCell className="text-center">{atp.blocks}</TableCell>
              <TableCell className="text-center">{atp.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Totals</TableCell>
            <TableCell className="text-center">{awayRebounds}</TableCell>
            <TableCell className="text-center">{awayAssists}</TableCell>
            <TableCell className="text-center">{awaySteals}</TableCell>
            <TableCell className="text-center">{awayBlocks}</TableCell>
            <TableCell className="text-center">{awayPoints}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <h2 className="p-2 font-medium">Home Team Players</h2>
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
          {homeTeamPlayers.map((atp, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{atp.player.name}</TableCell>
              <TableCell className="text-center">{atp.rebounds}</TableCell>
              <TableCell className="text-center">{atp.assists}</TableCell>
              <TableCell className="text-center">{atp.steals}</TableCell>
              <TableCell className="text-center">{atp.blocks}</TableCell>
              <TableCell className="text-center">{atp.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Totals</TableCell>
            <TableCell className="text-center">{homeRebounds}</TableCell>
            <TableCell className="text-center">{homeAssists}</TableCell>
            <TableCell className="text-center">{homeSteals}</TableCell>
            <TableCell className="text-center">{homeBlocks}</TableCell>
            <TableCell className="text-center">{homePoints}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
