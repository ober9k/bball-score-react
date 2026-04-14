import { useAuthContext } from "@/auth.tsx";
import { useTitle } from "@/hooks/page.ts";
import { useEffect } from "react";

export default function LogoutPage() {
  const { logout } = useAuthContext();

  useTitle("Logout");
  useEffect(() => {
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
