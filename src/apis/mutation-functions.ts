import { buildAuthApiPath } from "@/apis/query-functions.ts";
import type { LoginData } from "@/types/login.ts";
import axios from "axios";

export async function loginMutationFn(loginData: LoginData) {
  const { data } = await axios.post(buildAuthApiPath("login"), loginData);
  return data;
}
