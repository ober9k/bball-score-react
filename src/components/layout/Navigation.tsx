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
    <div className="p-2 flex gap-2">
      {links.map((link) => (
        <Link to={link.to} className="[&.active]:!font-bold !font-normal">
          {link.title}
        </Link>
      ))}
    </div>
  );
}
