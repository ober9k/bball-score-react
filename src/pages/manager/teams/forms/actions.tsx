import type { FormState } from "@/components/forms/season-form.tsx";
import { zTeam } from "@/schemas/team.ts";
import type { TeamData } from "@/types/team.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const getValue = (key: string): string => {
      console.log("getValue", "key", key, formData.get(key).toString());
      return formData.get(key).toString();
    }

    const fieldValues = {
      name: getValue("name"),
      shortName: getValue("shortName"),
      divisionId: getValue("divisionId"),
    };

    try {
      const data: TeamData = {
        name: fieldValues.name,
        shortName: fieldValues.shortName,
        divisionId: +fieldValues.divisionId,
      };

      zTeam.parse(data);
      await mutation.mutateAsync<TeamData>(data);
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
