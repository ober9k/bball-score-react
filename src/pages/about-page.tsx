import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function AboutPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("About");
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        Hello World.
      </p>
    </>
  );
}
