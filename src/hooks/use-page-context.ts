import { PageContext } from "@/contexts/page-context.ts";
import { useContext } from "react";

export default function usePageContext() {
  const {
    setPageHeader,
    title,
    setTitle,
    subTitle,
    setSubTitle,
    breadcrumbs,
    setBreadcrumbs,
  } = useContext(PageContext);

  return {
    setPageHeader,
    title,
    setTitle,
    subTitle,
    setSubTitle,
    breadcrumbs,
    setBreadcrumbs,
  };
}
