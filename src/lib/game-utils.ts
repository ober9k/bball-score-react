import { Phase, PhaseType, Side, SideType } from "@/types/game.ts";

export function mapSide(side: string): SideType {
  switch (side) {
    case "AWAY_TEAM": return Side.AWAY_TEAM;
    case "HOME_TEAM": return Side.HOME_TEAM;
    default:
      throw Error("Unexpected `Side` provided.");
  }
}

export function mapPhase(position: string): PhaseType {
  switch (position) {
    case "PRE_SEASON":     return Phase.PRE_SEASON;
    case "REGULAR_SEASON": return Phase.REGULAR_SEASON;
    case "POST_SEASON":    return Phase.POST_SEASON;
    default:
      throw Error("Unexpected `phase` provided.");
  }
}
