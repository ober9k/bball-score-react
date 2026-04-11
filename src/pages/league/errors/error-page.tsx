import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function ErrorPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Error");
  }, []);
  return (
    <>
      <p className="p-2 text-sm">
        Something unexpected happened.
      </p>
    </>
  );
}
