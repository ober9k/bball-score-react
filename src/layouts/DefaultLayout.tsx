import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import Footer from "../components/layout/page/Footer.tsx";
import Navigation from "../components/layout/Navigation.tsx";
import { PageContext } from "../contexts/PageContext.ts";

export default function RootLayout() {
  const [ title, setTitle ] = useState("%title%");
  const value = { title, setTitle };

  const client = new QueryClient();

  return (
    <>
      <PageContext value={value}>
        <Navigation/>
        <QueryClientProvider client={client}>
          <Outlet/>
        </QueryClientProvider>
        <Footer />
      </PageContext>
      <TanStackRouterDevtools/>
    </>
  );
}
