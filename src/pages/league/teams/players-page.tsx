import type { TeamLoaderProps, TeamPlayersLoaderProps } from "@/apis/loaders/types.ts";
import PlayerCard from "@/components/players/player-card.tsx";
import { TeamMenu } from "@/components/teams/team-menu.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import type { StatisticsLog } from "@/types/statistics-log.ts";
import { getRouteApi } from "@tanstack/react-router";

export function PlayersPage() {
  const { team, players, statisticsLogs }: TeamPlayersLoaderProps = getRouteApi(leaguePaths.Teams.Players).useLoaderData();

  useTitle("Players", team.name);
  useBreadcrumbs([
    { title: "League", to: leaguePaths.League.Index },
    { title: "Teams", to: leaguePaths.Teams.Index },
    { title: team.name + " Players" },
  ]);

  /* todo: optimize */
  const playerStats = new Map<number, StatisticsLog>();
  statisticsLogs.forEach((log) => {
    playerStats.set(log.player.id, log.stats);
  });

  return (
    <>
      <TeamMenu team={team} />
      <div className="grid grid-cols-3 gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} stats={playerStats.get(player.id)} />
        ))}
      </div>
    </>
  );
}

export { PlayersPage as TeamsPlayersPage };
