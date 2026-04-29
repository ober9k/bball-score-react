/* TODO: to be tidied up */
import type { RoleType } from "@/types/user/role.ts";

export type User = {
  loggedIn: boolean,
  email?: string,
  role?: string,
}

/* TODO: to be tidied up */
export type AuthUser = {
  email: string,
  role: RoleType,
  permissions: string[],
}

/* TODO: to be tidied up */
export type AuthUserData = {
  email: string,
  password: string,
}
