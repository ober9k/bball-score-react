import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navigation from "../components/layout/Navigation.tsx";

export default function RootLayout() {
  return (
    <>
      <h1>bball-score</h1>
      <Navigation />
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  );
}
