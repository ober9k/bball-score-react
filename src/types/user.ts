export type User = {
  loggedIn: boolean,
  email?: string,
  role?: string,
}

export type AuthUser = {
  email: string,
  role: string,
  permissions: string[],
}
