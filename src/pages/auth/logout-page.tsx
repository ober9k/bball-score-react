import usePageContext from "@/hooks/use-page-context.ts";
import useUserContext from "@/hooks/use-user-context.ts";
import { useEffect } from "react";

export default function LogoutPage() {
  const { setPageHeader } = usePageContext();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    setPageHeader("Logout");
    setUser({ loggedIn: false });
  }, []);

  return (
    <>
      <p className="p-2 text-sm">
        You have successfully logged out.
      </p>
    </>
  );
}
