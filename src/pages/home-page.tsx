import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function HomePage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Home");
  }, []);

  return (
    <>
      <h1 className="p-2 text-xl font-medium">
        Home
      </h1>
      <p className="p-2 text-sm">
        Hello World.
      </p>
    </>
  );
}
