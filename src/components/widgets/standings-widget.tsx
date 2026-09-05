import { sortByPoints } from "@/lib/standings-utils";
import { leaguePaths } from "@/routes/league/routes";
import { buttonVariants } from "@/shared/components/ui/button";
import type { StandingsLog } from "@/types/standings-log";
import { Link } from "@tanstack/react-router";
import { StandingsTable } from "../standings/standings-table";

type Props = {
  logs: StandingsLog[],
};

function StandingsWidget(props: Props) {
  const { logs } = props;
  
  const sortedLogs = logs.sort(sortByPoints);
  const viewLink = leaguePaths.League.Standings

  return (
    <>
      <article>
        <header>
          <h2>Standings</h2>
        </header>
        <section>
          <StandingsTable logs={sortedLogs} display="widget" />
        </section>
        <footer>
          <Link to={viewLink} className={buttonVariants({ variant: "secondary", size: "xs" })}>
            View Standings
          </Link>
        </footer>
      </article>
    </>
  );
}

export default StandingsWidget;
