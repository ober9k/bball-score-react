import axios from "axios";

/* TODO: add to config/env file instead */
const RootApiPath = "http://localhost/";
const RootApiPort = "8080";

/**
 * Build standardised URL for API usage.
 * @param parts
 */
function buildApiPath(...parts: Array<string>): string {
  const url =  new URL(RootApiPath);
  url.port = RootApiPort;
  url.pathname = ["api", "v1", "league", "1", ...parts].join("/");

  return url.toString();
}

export async function divisionsQueryFn() {
  const { data } = await axios.get(buildApiPath("divisions"));
  return data;
}

export async function divisionQueryFn({ queryKey }) {
  const [ , divisionId ] = queryKey;
  const { data } = await axios.get(buildApiPath("divisions", divisionId));
  return data;
}
