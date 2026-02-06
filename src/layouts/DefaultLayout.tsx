import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/layout/Header.tsx";
import Navigation from "../components/layout/Navigation.tsx";

export default function RootLayout() {
  return (
    <>
      <Navigation/>
      <Header>
        %title%
      </Header>
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  );
}
