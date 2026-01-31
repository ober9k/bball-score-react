import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navigation from "../components/layout/Navigation.tsx";

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  );
}
