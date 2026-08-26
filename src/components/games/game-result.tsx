import type { Game } from "@/types/game";
import * as styles from "@/components/games/game-result.module.css";
import { Button } from "@/shared/components/ui/button";
import { TeamLink } from "@/components/shared/links";
import { useRouter } from "@tanstack/react-router";
import { leaguePaths } from "@/routes/league/routes";
import TeamLogo from "@/components/teams/team-logo";

type Props = {
  game: Game,
};

/**
 * TODO: update to a more suitable name later
 */
function GameResult(props: Props) {
  const { game } = props;
  
  const router = useRouter();
  const results = game.teamLogs.map((tl) => ({
     team:  tl.team,
     score: tl.score,
  }));

  const winningScore = Math.max(...results.map((r) => r.score));

  const getScoreRowClass = (score: number) => {
    return (score === winningScore)
      ? styles.winningScoreRow
      : styles.scoreRow;
  };

  const gotoGame = () => {
    router.navigate({ to: leaguePaths.Games.View, params: { gameId: game.id } })
  }

  return (
    <>
      <article className={styles.result}>
        <div className={styles.scores}>
          <div className={styles.titleRow}>
            <h3>Round {game.round}</h3>
            <span>Final</span>
          </div>
          {results.map((result, key) => (
            <div key={key} className={getScoreRowClass(result.score)}>
              <h3>
                <TeamLogo team={result.team} />
                <TeamLink team={result.team} />
              </h3>
              <span>
                {result.score}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.status}>
          <Button onClick={gotoGame}>View</Button>
        </div>
      </article>
    </>
  );
}

export default GameResult;
