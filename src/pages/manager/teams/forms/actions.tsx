import { getCheckboxValue, getValue, onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/teams/forms/update-form.tsx";
import { zTeam } from "@/schemas/team.ts";
import type { BriefTeamData } from "@/types/team.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const fieldValues = {
      name:       getValue(formData, "name"),
      shortName:  getValue(formData, "shortName"),
      divisionId: getValue(formData, "divisionId"),
      activated:  getCheckboxValue(formData, "activated"),
      archived:   getCheckboxValue(formData, "archived"),
    };

    try {
      const data: BriefTeamData = {
        name:        fieldValues.name,
        shortName:   fieldValues.shortName,
        divisionId: +fieldValues.divisionId,
        activated:   fieldValues.activated,
        archived:    fieldValues.archived,
      };

      zTeam.parse(data);
      await mutation.mutateAsync(data);
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = z.flattenError(error);
        return onFieldError(fieldValues, fieldErrors);
      }
      else if (axios.isAxiosError(error)) {
        const { formErrors } = error.response!.data; /* todo: revisit strict/null checks for error data */
        return onFormError(fieldValues, formErrors);
      }

      return onUnexpectedError(fieldValues);
    }

    return onSuccess(fieldValues);
  };
}
