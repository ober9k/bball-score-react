import { useAuthContext } from "@/auth.tsx";
import usePageContext from "@/hooks/use-page-context.ts";
import { useEffect } from "react";

export default function LogoutPage() {
  const { setPageHeader } = usePageContext();
  const { logout } = useAuthContext();

  useEffect(() => {
    setPageHeader("Logout");
    logout();
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        You have successfully logged out.
      </p>
    </>
  );
}
