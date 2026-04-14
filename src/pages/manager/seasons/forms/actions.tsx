import type { FormState } from "@/pages/manager/seasons/forms/update-form.tsx";
import { zSeason } from "@/schemas/season.ts";
import type { SeasonData } from "@/types/season.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const getValue = (key: string): string => {
      return formData.get(key).toString();
    }

    const fieldValues = {
      name: getValue("name"),
    };

    try {
      const data: SeasonData = {
        name: fieldValues.name,
      };

      zSeason.parse(data);
      await mutation.mutateAsync<SeasonData>(data);
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
