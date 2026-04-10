import Navigation from "@/components/layout/navigation";
import type { Link } from "@/components/layout/page/page-breadcrumbs.tsx";
import PageContent from "@/components/layout/page/page-content.tsx";
import PageHeader from "@/components/layout/page/page-header.tsx";
import { PageContext } from "@/contexts/page-context.ts";
import { UserContext } from "@/contexts/user-context.ts";
import { getRouteApi, Outlet, rootRouteId } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
  const { user } = getRouteApi(rootRouteId).useLoaderData();
  const userContext = user;

  const [ title, setTitle ] = useState("");
  const [ subTitle, setSubTitle ] = useState("");
  const [ breadcrumbs, setBreadcrumbs ] = useState([]);

  /**
   * Utility function to wrap the above methods.
   * TODO: relocate to somewhere more suitable
   */
  const setPageHeader = (title: string = "", subTitle: string = "", breadcrumbs: Link[] = []) => {
    setTitle(title);
    setSubTitle(subTitle);
    setBreadcrumbs(breadcrumbs);
  };

  const pageContext = { setPageHeader, title, setTitle, subTitle, setSubTitle, breadcrumbs, setBreadcrumbs };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <UserContext value={userContext}>
        <PageContext value={pageContext}>
          <Navigation />
          <PageHeader />
          <PageContent>
            <Outlet/>
          </PageContent>
        </PageContext>
      </UserContext>
    </>
  );
}
