import { Link } from "@tanstack/react-router";
import { Paths } from "../../routes/paths.ts";

let linkId = 1;
const links: Array<{ id: number, title: string, to: string }> = [
  { id: linkId++, title: "Home", to: Paths.Home, },
  { id: linkId++, title: "Games", to: Paths.Games, },
  { id: linkId++, title: "Players", to: Paths.Players, },
  { id: linkId++, title: "Teams", to: Paths.Teams, },
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
            <Link key={link.id} to={link.to} className="[&.active]:font-bold rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
