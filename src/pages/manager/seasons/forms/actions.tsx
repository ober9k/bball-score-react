import { getCheckboxValue, getValue, onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/seasons/forms/update-form.tsx";
import { zSeason } from "@/schemas/season.ts";
import type { BriefSeasonData } from "@/types/season.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const fieldValues = {
      name:      getValue(formData, "name"),
      activated: getCheckboxValue(formData, "activated"),
      archived:  getCheckboxValue(formData, "archived"),
    };

    try {
      const data: BriefSeasonData = {
        name:      fieldValues.name,
        activated: fieldValues.activated,
        archived:  fieldValues.archived,
      };

      zSeason.parse(data);
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
