import { sleep } from "@utils/sleep";
import type { Request, Response } from "express";
import { mockGames } from "../../../src/data/games";
import type { TeamLog } from "../../../src/types/game/TeamLog";
import type { StandingsRow } from "../../../src/types/row/StandingsRow";
import type { Team } from "../../../src/types/Team";
import { getAwayTeamLog, getHomeTeamLog } from "../../../src/utilities/GameUtils";

type StandingsLog = StandingsRow;
type Standings = {
  standingsLogs: Array<StandingsLog>,
}

function getStandingsLogs(): Array<StandingsLog> {
  const games = mockGames;
  const standingsLogs: Array<StandingsLog> = [];

  let standingsRowId = 1;

  function getRow(team: Team): StandingsRow | undefined {
    return standingsLogs.find((standingsLog) => standingsLog.teamId === team.id);
  }

  function hasRow(team: Team): boolean {
    return getRow(team) !== undefined;
  }

  function createForTeam(team: Team): StandingsRow {
    return {
      id: standingsRowId++,
      teamId: team.id,
      team: team,
      wins: 0,
      losses: 0,
      draws: 0,
      byes: 0,
      pointsFor: 0,
      pointsAgainst: 0,
    };
  }

  function updateForTeam(teamLogA: TeamLog, teamLogB: TeamLog): void {
    // todo: refactor to something nicer
    if (!hasRow(teamLogA.team!)) {
      standingsLogs.push(
        createForTeam(teamLogA.team!)
      );
    }

    // todo: refactor to something nicer
    const teamRow = getRow(teamLogA.team!)!;
    teamRow.wins += (teamLogA.teamScore > teamLogB.teamScore) ? 1 : 0;
    teamRow.losses += (teamLogA.teamScore < teamLogB.teamScore) ? 1 : 0;
    teamRow.draws += (teamLogA.teamScore === teamLogB.teamScore) ? 1 : 0;
    teamRow.pointsFor += teamLogA.teamScore;
    teamRow.pointsAgainst += teamLogB.teamScore;
  }

  games.forEach((game) => {
    const awayTeamLog = getAwayTeamLog(game);
    const homeTeamLog = getHomeTeamLog(game);

    // todo: refactor to something nicer
    updateForTeam(awayTeamLog, homeTeamLog);
    updateForTeam(homeTeamLog, awayTeamLog);
  });

  return standingsLogs;
}

export async function getStandings(req: Request, res: Response) {
  await sleep(1000);

  res.status(200).json({
    /* referencing mock data for now */
    standings: {
      standingsLogs: getStandingsLogs(),
    } as Standings,
  });
}