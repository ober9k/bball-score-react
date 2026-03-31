import Breadcrumbs from "@/components/layout/breadcrumbs.tsx";
import Navigation from "@/components/layout/navigation";
import { PageContext } from "@/contexts/page-context.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
  const [ title, setTitle ] = useState("");
  const [ pageTitle, setPageTitle ] = useState("");
  const [ pageBreadcrumbs, setPageBreadcrumbs ] = useState([]);
  const pageContext = { title, setTitle, pageTitle, setPageTitle, pageBreadcrumbs, setPageBreadcrumbs };

  const client = new QueryClient();

  return (
    <>
      <PageContext value={pageContext}>
        <Navigation/>
        <Breadcrumbs links={pageBreadcrumbs} />
        <QueryClientProvider client={client}>
          <Outlet/>
        </QueryClientProvider>
      </PageContext>
    </>
  );
}
