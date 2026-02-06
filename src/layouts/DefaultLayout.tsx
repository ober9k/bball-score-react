import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import Header from "../components/layout/Header.tsx";
import Navigation from "../components/layout/Navigation.tsx";
import { PageContext } from "../contexts/PageContext.ts";

export default function RootLayout() {
  const [ title, setTitle ] = useState("%title%");
  const value = { title, setTitle };

  return (
    <>
      <PageContext value={value}>
        <Navigation/>
        <Header>
          {value.title}
        </Header>
        <div className="mx-auto bg-white shadow-sm max-w-2xl mt-8 p-4 rounded-lg">
          <Outlet/>
        </div>
      </PageContext>
      <TanStackRouterDevtools/>
    </>
  );
}
