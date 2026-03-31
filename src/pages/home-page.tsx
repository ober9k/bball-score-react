import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function HomePage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Home");
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        Hello World.
      </p>
    </>
  );
}
