import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Paths } from "../routes/paths.ts";

export default function RootLayout() {
  return (
    <>
      <h1>bball-score</h1>
      <div className="p-2 flex gap-2">
        <Link to={Paths.Home} className="[&.active]:font-bold">
          Home
        </Link>
        <Link to={Paths.Games} className="[&.active]:font-bold">
          Games
        </Link>
        <Link to={Paths.Players} className="[&.active]:font-bold">
          Players
        </Link>
        <Link to={Paths.Teams} className="[&.active]:font-bold">
          Teams
        </Link>
      </div>
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  );
}
