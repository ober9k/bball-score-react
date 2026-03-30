import { Link } from "@tanstack/react-router";

type Link = {
  title: string,
  to: string,
}

const links: Link[] = [
  { title: "Home", to: "/", },
  { title: "About", to: "/about", },
];

export default function Navigation() {
  return (
    <>
      <nav className="flex gap-2 p-2">
        {links.map((link, index) => (
          <Link key={index} to={link.to} className="[&.active]:underline">
            {link.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
