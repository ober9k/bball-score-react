import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function LoginPage() {
  const { setPageHeader } = usePageContext();

  useEffect(() => {
    setPageHeader("Login");
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        Login
      </p>
    </>
  );
}
