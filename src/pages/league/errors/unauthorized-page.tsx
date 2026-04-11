import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function UnauthorizedPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Unauthorized");
  }, []);
  return (
    <>
      <p className="p-2 text-sm">
        You cannot go here.
      </p>
    </>
  );
}
