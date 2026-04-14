import { useAuthContext } from "@/auth.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import { divisionsPaths } from "@/routes/league/divisions/routes.ts";
import { seasonsPaths } from "@/routes/league/seasons/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { Button } from "@/shared/components/ui/button.tsx";
import { useRouter } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";

export default function LeaguePage() {
  const { setPageHeader } = usePageContext();
  const { user, isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setPageHeader("League", "", [
      { title: "League" },
    ]);
  }, []);

  const gotoSeasons = () => {
    router.navigate({
      to: managerPaths.Seasons.Index,
      replace: true,
    });
  };

  const gotoDivisions = () => {
    router.navigate({
      to: managerPaths.Divisions.Index,
      replace: true,
    });
  };

  const gotoTeams = () => {
    router.navigate({
      to: managerPaths.Teams.Index,
      replace: true,
    });
  };

  const gotoPlayers = () => {
    router.navigate({
      to: managerPaths.Players.Index,
      replace: true,
    });
  };

  const gotoGames = () => {
    alert("TBD");
  };

  const gotoLeagueSeasons = () => {
    router.navigate({
      to: seasonsPaths.Seasons,
      replace: true,
    });
  };

  const gotoLeagueDivisions = () => {
    router.navigate({
      to: divisionsPaths.Divisions,
      replace: true,
    });
  };

  return (
    <>
      {isAuthenticated() && (
        <Fragment>
          <h2 className="p-2 font-medium">Manage League</h2>
          <p className="p-2 text-sm flex gap-1">
            <Button onClick={() => gotoSeasons()}>Seasons</Button>
            <Button onClick={() => gotoDivisions()}>Divisions</Button>
            <Button onClick={() => gotoTeams()}>Teams</Button>
            <Button onClick={() => gotoPlayers()}>Players</Button>
            <Button onClick={() => gotoGames()}>Games</Button>
          </p>
        </Fragment>
      )}
      <h2 className="p-2 font-medium">Current User</h2>
      <p className="p-2 text-sm">
        User: {isAuthenticated() ? user().email : "Not logged in..."}
      </p>
      <h2 className="p-2 font-medium">Miscellaneous</h2>
      <p className="p-2 text-sm flex gap-1">
        <Button onClick={() => gotoLeagueSeasons()}>Seasons</Button>
        <Button onClick={() => gotoLeagueDivisions()}>Divisions</Button>
      </p>
    </>
  );
}
