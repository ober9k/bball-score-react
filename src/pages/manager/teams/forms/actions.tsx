import { onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/teams/forms/update-form.tsx";
import { zTeam } from "@/schemas/team.ts";
import type { UpdateTeamDto } from "@/types/team.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const getValue = (key: string): string => {
      return formData.get(key).toString();
    }

    const fieldValues = {
      name:       getValue("name"),
      shortName:  getValue("shortName"),
      divisionId: getValue("divisionId"),
    };

    try {
      const data: UpdateTeamDto = {
        name:        fieldValues.name,
        shortName:   fieldValues.shortName,
        divisionId: +fieldValues.divisionId,
      };

      zTeam.parse(data);
      await mutation.mutateAsync<UpdateTeamDto>(data);
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = z.flattenError(error);
        return onFieldError(fieldValues, fieldErrors);
      }
      else if (axios.isAxiosError(error)) {
        const { formErrors } = error.response.data;
        return onFormError(fieldValues, formErrors);
      }

      return onUnexpectedError(fieldValues);
    }

    return onSuccess(fieldValues);
  };
}
