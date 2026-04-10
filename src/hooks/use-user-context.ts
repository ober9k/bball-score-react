import { UserContext } from "@/contexts/user-context.ts";
import { useContext } from "react";

export default function useUserContext() {
  const {
    email,
    password,
    role,
  } = useContext(UserContext);

  return {
    email,
    password,
    role,
  };
}
