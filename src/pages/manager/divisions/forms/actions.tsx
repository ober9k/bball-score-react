import type { FormState } from "@/pages/manager/divisions/forms/update-form.tsx";
import { zDivision } from "@/schemas/division.ts";
import type { DivisionData } from "@/types/division.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const getValue = (key: string): string => {
      return formData.get(key).toString();
    }

    const fieldValues = {
      name: getValue("name"),
      seasonId: getValue("seasonId"),
    };

    try {
      const data: DivisionData = {
        name: fieldValues.name,
        seasonId: +fieldValues.seasonId,
      };

      zDivision.parse(data);
      await mutation.mutateAsync<DivisionData>(data);
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
