import { minLengthMessage } from "@/lib/messages";
import { Phase, type PhaseType } from "@/types/game.ts";
import { z } from "zod";

const RoundLabel = "Round";
const RoundMinLength = 1;

const phaseEnum = Object.values(Phase) as [PhaseType, ...PhaseType[]];

export const zGame = z.object({
  date: z.date(),
  phase: z.enum(phaseEnum),
  round: z.number()
    .min(RoundMinLength, minLengthMessage(RoundLabel, RoundMinLength)),
  seasonId: z.number(),
  divisionId: z.number(),
  active: z.boolean(),
  archived: z.boolean(),
});
