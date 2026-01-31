import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export default function RootLayout() {
  return (
    <>
      <h1>bball-score</h1>
      <div>
        <p>
          built using React
        </p>
      </div>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/teams" className="[&.active]:font-bold">
          Teams
        </Link>
      </div>
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  );
}
