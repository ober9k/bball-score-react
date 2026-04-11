import { z } from "zod";
import { maxLengthMessage, minLengthMessage, validEmailAddressMessage } from "../lib/messages.ts";

const EmailLabel = "Email Address";
const EmailMinLength = 1;

const PasswordLabel = "Password";
const PasswordMinLength = 1;
const PasswordMaxLength = 16;

export const zLogin = z.object({
  email: z
    .email(validEmailAddressMessage(EmailLabel)),
  password: z
    .string()
    .min(PasswordMinLength, minLengthMessage(PasswordLabel, PasswordMinLength))
    .max(PasswordMaxLength, maxLengthMessage(PasswordLabel, PasswordMaxLength)),
});
