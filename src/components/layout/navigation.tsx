import useUserContext from "@/hooks/use-user-context.ts";
import { authPaths } from "@/routes/auth/routes.ts";
import { divisionsPaths } from "@/routes/league/divisions/routes.ts";
import { gamesPaths } from "@/routes/league/games/routes.ts";
import { playersPaths } from "@/routes/league/players/routes.ts";
import { leaguePaths } from "@/routes/league/routes.ts";
import { seasonsPaths } from "@/routes/league/seasons/routes.ts";
import { teamsPaths } from "@/routes/league/teams/routes.ts";
import { Link } from "@tanstack/react-router";

type Link = {
  title: string,
  to: string,
  params?: object,
}

const links: Link[] = [
  { title: "Home", to: "/", },
  { title: "About", to: "/about", },
  { title: "League", to: leaguePaths.League, },
  { title: "Divisions", to: divisionsPaths.Divisions, },
  { title: "Games", to: gamesPaths.Games, },
  { title: "Players", to: playersPaths.Players, },
  { title: "Seasons", to: seasonsPaths.Seasons, },
  { title: "Standings", to: leaguePaths.Standings, },
  { title: "Statistics", to: leaguePaths.Statistics, },
  { title: "Teams", to: teamsPaths.Teams, },
];

const linkClasses = "[&.active]:underline [&.active]:font-bold rounded-md p-1 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white";
const altLinkClasses = linkClasses + " " + "ml-auto";

export default function Navigation() {
  const userContext = useUserContext();

  const isExact = (link: Link): boolean => {
    return (link.to === leaguePaths.League);
  };

  const isLoggedIn = (): boolean => {
    return (userContext.loggedIn);
  };

  return (
    <>
      <nav className="flex gap-2 p-2 bg-gray-800">
        {links.map((link, index) => (
          <Link key={index} to={link.to} activeOptions={{ exact: isExact(link) }} className={linkClasses}>
            {link.title}
          </Link>
        ))}
        {(isLoggedIn()) ? (
          <Link to={authPaths.Logout} className={altLinkClasses}>
            Logout
          </Link>
        ) : (
          <Link to={authPaths.Login} className={altLinkClasses}>
            Login
          </Link>
        )}
      </nav>
    </>
  );
}
