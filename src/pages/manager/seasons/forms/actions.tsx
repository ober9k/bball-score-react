import { onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/seasons/forms/update-form.tsx";
import { zSeason } from "@/schemas/season.ts";
import type { UpdateSeasonDto } from "@/types/season.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const getValue = (key: string): string => {
      return formData.get(key).toString();
    }

    const getCheckboxValue = (key: string): string => {
      return formData.has(key)
        ? formData.get(key) === "on"
        : false;
    }

    const fieldValues = {
      name: getValue("name"),
      active: getCheckboxValue("active"),
      archived: getCheckboxValue("archived"),
    };

    try {
      const data: UpdateSeasonDto = {
        name: fieldValues.name,
        active: fieldValues.active,
        archived: fieldValues.archived,
      };

      zSeason.parse(data);
      await mutation.mutateAsync<UpdateSeasonDto>(data);
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
