import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function LeaguePage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("League", "", [
      { title: "League" },
    ]);
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        TBD.
      </p>
    </>
  );
}
