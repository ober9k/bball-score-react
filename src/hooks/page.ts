import type { Link } from "@/components/layout/page/page-breadcrumbs.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export function useTitle(
  title: string,
  subTitle: string = "",
) {
  const { setTitle, setSubTitle } = usePageContext();

  useEffect(() => {
    setTitle(title);
    setSubTitle(subTitle);
  }, []);
}

export function useBreadcrumbs(
  breadcrumbs: Link[] = [],
) {
  const { setBreadcrumbs } = usePageContext();

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);
}
