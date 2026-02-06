import type { ReactNode } from "react";
import type { Team } from "../../../types/Team.ts";

type TeamsRowProps = {
  children: ReactNode,
  team: Team,
}

function getTeamStyle(team: Team): { color: string, backgroundColor: string } {
  return {
    color: team.teamStyle.textColor,
    backgroundColor: team.teamStyle.bgColor,
  }
}

export default function TeamsRow(props: TeamsRowProps) {
  const { team } = props;

  return (
    <>
      <th colSpan={4} className={"text-left px-4 py-2 font-medium"} style={getTeamStyle(team)}>
        {props.children}
      </th>
    </>
  )
}
