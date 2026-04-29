import Navigation from "@/components/layout/navigation";
import type { Link } from "@/components/layout/page/page-breadcrumbs.tsx";
import PageContent from "@/components/layout/page/page-content.tsx";
import PageHeader from "@/components/layout/page/page-header.tsx";
import { type IPageContext, PageContext } from "@/contexts/page-context.ts";
import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
  const [ title, setTitle ] = useState("");
  const [ subTitle, setSubTitle ] = useState("");
  const [ breadcrumbs, setBreadcrumbs ] = useState<Link[]>([]);

  /**
   * Utility function to wrap the above methods.
   * TODO: relocate to somewhere more suitable
   */
  const setPageHeader = (title: string = "", subTitle: string = "", breadcrumbs: Link[] = []) => {
    setTitle(title);
    setSubTitle(subTitle);
    setBreadcrumbs(breadcrumbs);
  };

  const pageContext: IPageContext = { setPageHeader, title, setTitle, subTitle, setSubTitle, breadcrumbs, setBreadcrumbs };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <PageContext value={pageContext}>
        <Navigation />
        <PageHeader />
        <PageContent>
          <Outlet/>
        </PageContent>
      </PageContext>
    </>
  );
}
