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
  } = useContext(PageContext)!; /* todo: revisit strict/null checks for page context */

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
