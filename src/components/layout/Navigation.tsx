import { Link } from "@tanstack/react-router";
import { Paths } from "../../routes/paths.ts";

const links: Array<{ title: string, to: string }> = [
  { title: "Home", to: Paths.Home, },
  { title: "Games", to: Paths.Games, },
  { title: "Players", to: Paths.Players, },
  { title: "Teams", to: Paths.Teams, },
];

export default function Navigation() {
  return (
    <div className="bg-gray-800 flex h-16 items-center justify-between">
      <div className="flex items-center">
        <div className="shrink-0 pl-4 pr-2 py-2">
          <span className="text-2xl grayscale">
            🏀
          </span>
        </div>
        <div className="">
          {links.map((link) => (
            <Link to={link.to} className="[&.active]:font-bold rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
