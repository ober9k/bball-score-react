import type { Player } from "../types/Player.ts";
import { mapBasePosition } from "../utilities/PlayerUtils.ts";
import PlayerLink from "./links/PlayerLink.tsx";

type PlayerListProps = {
  players: Array<Player>,
}

function NonEmptyPlayersList({ players }: PlayerListProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {players.map((player) => (
        <div key={player.id} className="border border-gray-200 rounded-sm">
          <div className="relative min-h-24 bg-gray-300">
            <div className="absolute right-0">
              <img src="/images/player.png" alt={player.name} height={96} width={96} className={"mx-1"}/>
            </div>
            <div className="absolute p-2">
              <strong className="font-medium text-lg"><PlayerLink player={player}/></strong>
            </div>
          </div>
          <div className="p-1">
            #{player.number} &ndash; {mapBasePosition(player.position)}
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyPlayersList() {
  return (
    <p className="w-full text-center">
      No active players to show for the current season.
    </p>
  )
}

export default function PlayersList({ players }: PlayerListProps) {
  const hasPlayers = !!players.length;

  return (
    <div>
      {hasPlayers && <NonEmptyPlayersList players={players} />}
      {!hasPlayers && <EmptyPlayersList/>}
    </div>
  );
}
