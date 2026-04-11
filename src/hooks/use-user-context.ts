import { UserContext } from "@/contexts/user-context.ts";
import { useContext } from "react";

export default function useUserContext() {
  const {
    user,
    setUser,
  } = useContext(UserContext);

  const isLoggedIn = () => {
    return user.loggedIn;
  };

  return {
    user,
    setUser,
    isLoggedIn,
  };
}
