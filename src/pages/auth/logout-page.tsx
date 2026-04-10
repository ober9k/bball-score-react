import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function LogoutPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Logout");
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        Logout
      </p>
    </>
  );
}
