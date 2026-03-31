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

export default function Navigation() {

  const isExact = (link: Link): boolean => {
    return (link.to === leaguePaths.League);
  };

  return (
    <>
      <nav className="flex gap-2 p-2">
        {links.map((link, index) => (
          <Link key={index} to={link.to} activeOptions={{ exact: isExact(link) }} className="[&.active]:underline">
            {link.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
