import type { FormState } from "@/pages/auth/forms/login-form.tsx";
import { zUser } from "@/schemas/user.ts";
import type { AuthUserData } from "@/types/user.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const getValue = (key: string): string => {
      return formData.get(key).toString();
    }

    const fieldValues = {
      email: getValue("email"),
      password: getValue("password"),
    };

    try {
      const data: AuthUserData = {
        email: fieldValues.email,
        password: fieldValues.password,
      };

      zUser.parse(data);
      await mutation.mutateAsync<AuthUserData>(data);
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = z.flattenError(error);

        return {
          fieldValues,
          fieldErrors,
          formErrors: [],
        };
      }
      else if (axios.isAxiosError(error)) {
        const { formErrors } = error.response.data;

        return {
          fieldValues,
          fieldErrors: {},
          formErrors,
        };
      }

      return {
        fieldValues,
        fieldErrors: {},
        formErrors: ["Unexpected error has occurred."],
      };
    }

    return {
      fieldValues,
      fieldErrors: {},
      formErrors: [],
    };
  };
}
