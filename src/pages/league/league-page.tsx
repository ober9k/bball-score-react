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
      <h1 className="p-2 text-xl font-medium">
        League
      </h1>
      <p className="p-2 text-sm">
        TBD.
      </p>
    </>
  );
}
