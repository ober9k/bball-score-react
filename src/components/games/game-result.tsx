import type { Game } from "@/types/game";
import * as styles from "@/components/games/game-result.module.css";
import { Button } from "@/shared/components/ui/button";

type Props = {
  game: Game,
};

/**
 * TODO: update to a more suitable name later
 */
function GameResult(props: Props) {
  const { game } = props;

  const results = game.teamLogs.map((tl) => ({
     name:      tl.team.name,
     shortName: tl.team.shortName,
     score:     tl.score,
  }));

  const winningScore = Math.max(...results.map((r) => r.score));

  const isWinningScore = (score: number) => {
    return score === winningScore;
  };

  return (
    <>
      <article className={styles.result}>
        <div className={styles.scores}>
          <div className={styles.titleRow}>
            <h3>Round {game.round}</h3>
            <span>Final</span>
          </div>
          {results.map((result, key) => (
            <div key={key} className={isWinningScore(result.score) ? styles.winningScoreRow : styles.scoreRow}>
              <h3>{result.name}</h3>
              <span>{result.score}</span>
            </div>
          ))}
        </div>
        <div className={styles.status}>
          <Button>View</Button>
        </div>
      </article>
    </>
  );
}

export default GameResult;
