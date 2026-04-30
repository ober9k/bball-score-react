import { buildAuthApiUrl } from "@/lib/urls.ts";
import type { LoginData } from "@/types/login.ts";
import axios from "axios";

export async function loginMutationFn(loginData: LoginData) {
  const { data } = await axios.post(buildAuthApiUrl("login"), loginData);
  return data;
}
