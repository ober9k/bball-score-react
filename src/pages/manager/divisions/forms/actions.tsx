import { getCheckboxValue, getValue, onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/divisions/forms/update-form.tsx";
import { zDivision } from "@/schemas/division.ts";
import type { UpdateDivisionDto } from "@/types/division.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const fieldValues = {
      name:     getValue(formData, "name"),
      seasonId: getValue(formData, "seasonId"),
      active:   getCheckboxValue(formData, "active"),
      archived: getCheckboxValue(formData, "archived"),
    };

    try {
      const data: UpdateDivisionDto = {
        name:      fieldValues.name,
        seasonId: +fieldValues.seasonId,
        active:    fieldValues.active,
        archived:  fieldValues.archived,
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
        const { formErrors } = error.response.data;
        return onFormError(fieldValues, formErrors);
      }

      return onUnexpectedError(fieldValues);
    }

    return onSuccess(fieldValues);
  };
}
