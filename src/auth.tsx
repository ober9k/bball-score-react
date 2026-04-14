import type { AuthUser } from "@/types/user.ts";
import { Role } from "@/types/user/role.ts";
import { createContext, ReactNode, Ref, useContext, useRef } from "react";

export interface IAuthContext {
  userRef: Ref<AuthUser | null>, /* just use a plain object */
  isAuthenticated: () => boolean,
  isAuthorized: (permission: string) => boolean,
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

type AuthProviderProps = {
  children: ReactNode,
};

const authenticatedRoles = [
  Role.ADMINISTRATOR,
  Role.MANAGER,
];

export function AuthProvider({ children }: AuthProviderProps) {
  const userRef = useRef<AuthUser>(null);

  /**
   * Convenience method for accessing user.
   */
  const user = () => {
    return userRef.current;
  };

  /**
   * Check for presence of authenticated user.
   */
  const isAuthenticated = () => {
    return user() && authenticatedRoles.includes(user().role);
  };

  /**
   * Check if user is authorized based on permissions.
   * This still needs to be implemented properly.
   */
  const isAuthorized = (permission: string) => {
    return user() && true;
  };

  const logout = () => {
    userRef.current = null; /* invalidate it all */
  };

  return (
    <AuthContext.Provider value={{ user, userRef, isAuthenticated, isAuthorized, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
