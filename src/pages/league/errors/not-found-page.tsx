import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function NotFoundPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Not Found");
  }, []);
  return (
    <>
      <p className="p-2 text-sm">
        Whatever you were looking for wasn't found.
      </p>
    </>
  );
}
