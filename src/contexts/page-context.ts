import type { Link } from "@/components/layout/page/page-breadcrumbs.tsx";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface IPageContext {
  setPageHeader: (title?: string, subTitle?: string, breadcrumbs?: Link[]) => void,
  title: string,
  setTitle: Dispatch<SetStateAction<string>>,
  subTitle: string,
  setSubTitle: Dispatch<SetStateAction<string>>,
  breadcrumbs: Link[],
  setBreadcrumbs: Dispatch<SetStateAction<Link[]>>,
}

export const PageContext = createContext<IPageContext | null>(null);
