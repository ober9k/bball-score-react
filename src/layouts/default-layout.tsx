import Navigation from "@/components/layout/navigation.tsx";
import { Outlet } from "@tanstack/react-router";

export default function DefaultLayout() {
  return (
    <>
      <Navigation/>
      <Outlet/>
    </>
  );
}
