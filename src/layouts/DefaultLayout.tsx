import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import Footer from "../components/layout/page/Footer.tsx";
import Navigation from "../components/layout/Navigation.tsx";
import { PageContext } from "../contexts/PageContext.ts";

export default function RootLayout() {
  const [ title, setTitle ] = useState("%title%");
  const value = { title, setTitle };

  return (
    <>
      <PageContext value={value}>
        <Navigation/>
        <Outlet/>
        <Footer />
      </PageContext>
      <TanStackRouterDevtools/>
    </>
  );
}
