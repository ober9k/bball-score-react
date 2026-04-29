import { format } from "date-fns";

export function formatYMD(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
