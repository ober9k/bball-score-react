import { withActivatable, withArchivable } from "@/schemas/schemas.ts";
import { z } from "zod";
import { maxLengthMessage, minLengthMessage } from "../lib/messages.ts";

const NameLabel = "Name";
const NameMinLength = 1;
const NameMaxLength = 20;

const SeasonLabel = "Season";
const SeasonMinLength = 1;

export const zDivision = z.object({
  name: z
    .string()
    .min(NameMinLength, minLengthMessage(NameLabel, NameMinLength))
    .max(NameMaxLength, maxLengthMessage(NameLabel, NameMaxLength)),
  seasonId: z
    .number()
    .min(SeasonMinLength, minLengthMessage(SeasonLabel, SeasonMinLength)),
  ...withActivatable,
  ...withArchivable,
});
