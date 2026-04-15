import { i18n } from "@/lib/phrases.ts";
import { type Player, Position, type PositionType } from "@/types/player.ts";
import { Fragment } from "react";

const fullPositionMap = new Map<PositionType, string>()
  .set(Position.PointGuard,    i18n("position.type.label.pointGuard"))
  .set(Position.ShootingGuard, i18n("position.type.label.shootingGuard"))
  .set(Position.SmallForward,  i18n("position.type.label.smallForward"))
  .set(Position.PowerForward,  i18n("position.type.label.powerForward"))
  .set(Position.Center,        i18n("position.type.label.center"));

const shortPositionMap = new Map<PositionType, string>()
  .set(Position.PointGuard,    i18n("position.type.label.guard"))
  .set(Position.ShootingGuard, i18n("position.type.label.guard"))
  .set(Position.SmallForward,  i18n("position.type.label.forward"))
  .set(Position.PowerForward,  i18n("position.type.label.forward"))
  .set(Position.Center,        i18n("position.type.label.center"));

type Props = {
  player: Player,
  fullPosition?: boolean,
};

export function PlayerPosition({ player, fullPosition = false }: Props) {
  /* map based on desired position display */
  const position = (fullPosition)
    ? fullPositionMap.get(player.position)
    : shortPositionMap.get(player.position);

  return (
    <Fragment>
      {position}
    </Fragment>
  );
}
