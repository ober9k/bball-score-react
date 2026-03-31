import { PageContext } from "@/contexts/page-context.ts";
import { useContext } from "react";

export default function usePageContext() {
  const {
    title,
    setTitle,
    pageTitle,
    setPageTitle,
    pageSubTitle,
    setPageSubTitle,
    pageBreadcrumbs,
    setPageBreadcrumbs,
  } = useContext(PageContext);

  return {
    title,
    setTitle,
    pageTitle,
    setPageTitle,
    pageSubTitle,
    setPageSubTitle,
    pageBreadcrumbs,
    setPageBreadcrumbs,
  };
}
