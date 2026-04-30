import { withActivatable, withArchivable } from "@/schemas/schemas.ts";
import { z } from "zod";
import { maxLengthMessage, minLengthMessage } from "../lib/messages.ts";

const NameLabel = "Name";
const NameMinLength = 1;
const NameMaxLength = 20;

export const zSeason = z.object({
  name: z
    .string()
    .min(NameMinLength, minLengthMessage(NameLabel, NameMinLength))
    .max(NameMaxLength, maxLengthMessage(NameLabel, NameMaxLength)),
  ...withActivatable,
  ...withArchivable,
});
