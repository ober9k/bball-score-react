import { getCheckboxValue, getValue, onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/divisions/forms/update-form.tsx";
import { zDivision } from "@/schemas/division.ts";
import type { BriefDivisionData } from "@/types/division.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const fieldValues = {
      name:      getValue(formData, "name"),
      seasonId:  getValue(formData, "seasonId"),
      activated: getCheckboxValue(formData, "activated"),
      archived:  getCheckboxValue(formData, "archived"),
    };

    try {
      const data: BriefDivisionData = {
        name:       fieldValues.name,
        seasonId:  +fieldValues.seasonId,
        activated:  fieldValues.activated,
        archived:   fieldValues.archived,
      };

      zDivision.parse(data);
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
