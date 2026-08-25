import { useAuthContext } from "@/auth.tsx";
import { useBreadcrumbs, useTitle } from "@/hooks/page";
import { leaguePaths } from "@/routes/league/routes.ts";
import { managerPaths } from "@/routes/manager/routes.ts";
import { Button } from "@/shared/components/ui/button.tsx";
import { useRouter } from "@tanstack/react-router";
import { Fragment } from "react";

type HomeButtonProps = {
  title: string;
  to: string;
};

function HomeButton(props: HomeButtonProps) {
  const router = useRouter();
  const { title, to } = props;

  return (
    <>
      <Button onClick={() => router.navigate({ to })}>{title}</Button>
    </>
  );
}

export function Home() {
  const { user, isAuthenticated } = useAuthContext();
  
  useTitle("League");
  useBreadcrumbs([]);

  const manageButtons = [
    { title: "Seasons",   to: managerPaths.Seasons.Index },
    { title: "Divisions", to: managerPaths.Divisions.Index },
    { title: "Teams",     to: managerPaths.Teams.Index },
    { title: "Players",   to: managerPaths.Players.Index },
    { title: "Games",     to: managerPaths.Games.Index },
  ];

  const leagueButtons = [
    { title: "Seasons",   to: leaguePaths.Seasons.Index },
    { title: "Divisions", to: leaguePaths.Divisions.Index },
  ];

  return (
    <>
      {isAuthenticated() && (
        <Fragment>
          <h2 className="p-2 font-medium">Manage League</h2>
          <p className="p-2 text-sm flex gap-1">
            {manageButtons.map((button, key) => (
              <HomeButton key={key} title={button.title} to={button.to} />
            ))}
          </p>
        </Fragment>
      )}
      <h2 className="p-2 font-medium">Current User</h2>
      <p className="p-2 text-sm">
        User: {isAuthenticated() ? user().email : "Not logged in..."}
      </p>
      <h2 className="p-2 font-medium">Miscellaneous</h2>
      <p className="p-2 text-sm flex gap-1">
        {leagueButtons.map((button, key) => (
          <HomeButton key={key} title={button.title} to={button.to} />
        ))}
      </p>
    </>
  );
}

export default Home;
