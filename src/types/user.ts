/* TODO: to be tidied up */
export type User = {
  loggedIn: boolean,
  email?: string,
  role?: string,
}

/* TODO: to be tidied up */
export type AuthUser = {
  email: string,
  role: string,
  permissions: string[],
}

/* TODO: to be tidied up */
export type AuthUserData = {
  email: string,
  password: string,
}
