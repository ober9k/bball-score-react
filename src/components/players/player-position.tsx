import { getPositionLabel } from "@/lib/player-utils";
import { type Player } from "@/types/player";

type Props = {
  player: Player,
  fullPosition?: boolean,
};

export function PlayerPosition(props: Props) {
  const { player, fullPosition = false } = props;
  const position = getPositionLabel(player.position, fullPosition);

  return (
    <>
      {position}
    </>
  );
}
