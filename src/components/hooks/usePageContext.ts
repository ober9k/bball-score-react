import { useContext } from "react";
import { PageContext } from "../../contexts/PageContext.ts";

/**
 * TODO:
 * This is an experiment... there's a better way to handle it.
 */
export default function usePageContext() {
  return useContext(PageContext);
}
