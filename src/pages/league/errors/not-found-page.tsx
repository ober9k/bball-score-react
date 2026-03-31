import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function NotFoundPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Not Found");
  }, []);
  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        Not Found
      </h1>
      <p className="p-2 text-sm">
        TBD.
      </p>
    </>
  );
}
