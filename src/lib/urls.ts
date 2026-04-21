/* TODO: add to config/env file instead */
const RootApiPath = "http://localhost/";
const RootApiPort = "8080";

/**
 * Build standardised URL for API usage.
 */
export function buildApiUrl(...parts: string[]): string {
  const url =  new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", "v1", ...parts].join("/");

  return url.toString();
}

/**
 * Build standardised URL for league API usage.
 */
export function buildLeagueApiUrl(...parts: string[]): string {
  return buildApiUrl("leagues", "1", ...parts);
}

/**
 * Build standardised URL for auth API usage.
 */
export function buildAuthApiUrl(...parts: string[]): string {
  return buildApiUrl("auth", ...parts);
}
