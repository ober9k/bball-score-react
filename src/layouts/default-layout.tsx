import Navigation from "@/components/layout/navigation";
import PageHeader from "@/components/layout/page/page-header.tsx";
import { PageContext } from "@/contexts/page-context.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
  const [ title, setTitle ] = useState("");
  const [ pageTitle, setPageTitle ] = useState("");
  const [ pageSubTitle, setPageSubTitle ] = useState("");
  const [ pageBreadcrumbs, setPageBreadcrumbs ] = useState([]);
  const pageContext = { title, setTitle, pageTitle, setPageTitle, pageSubTitle, setPageSubTitle, pageBreadcrumbs, setPageBreadcrumbs };

  const client = new QueryClient();

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <PageContext value={pageContext}>
        <Navigation/>
        <PageHeader />
        <QueryClientProvider client={client}>
          <Outlet/>
        </QueryClientProvider>
      </PageContext>
    </>
  );
}
