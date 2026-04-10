import { UserContext } from "@/contexts/user-context.ts";
import { useContext } from "react";

export default function useUserContext() {
  const {
    email,
    role,
  } = useContext(UserContext);

  return {
    email,
    role,
  };
}
