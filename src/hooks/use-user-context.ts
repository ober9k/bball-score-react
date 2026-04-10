import { UserContext } from "@/contexts/user-context.ts";
import { useContext } from "react";

export default function useUserContext() {
  const {
    loggedIn,
    email,
    role,
  } = useContext(UserContext);

  return {
    loggedIn,
    email,
    role,
  };
}
