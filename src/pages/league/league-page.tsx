import usePageContext from "@/hooks/use-page-context.ts";
import useUserContext from "@/hooks/use-user-context.ts";
import { useEffect } from "react";

export default function LeaguePage() {
  const { setPageHeader } = usePageContext();
  const { user, isLoggedIn } = useUserContext();

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
      <p className="p-2 text-sm">
        User: {isLoggedIn() ? user.email : "Not logged in..."}
      </p>
    </>
  );
}
