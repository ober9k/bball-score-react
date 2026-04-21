import { getCheckboxValue, getValue, onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/games/forms/update-form.tsx";
import { zGame } from "@/schemas/game.ts";
import type { UpdateGameDto } from "@/types/game.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const fieldValues = {
      date:       getValue(formData, "date"),
      phase:      getValue(formData, "phase"),
      round:      getValue(formData, "round"),
      seasonId:   getValue(formData, "seasonId"),
      divisionId: getValue(formData, "divisionId"),
      active:     getCheckboxValue(formData, "active"),
      archived:   getCheckboxValue(formData, "archived"),
    };

    try {
      const data: UpdateGameDto = {
        date:        new Date(fieldValues.date),
        phase:       fieldValues.phase,
        round:       parseInt(fieldValues.round),
        seasonId:   +fieldValues.seasonId,
        divisionId: +fieldValues.divisionId,
        active:      fieldValues.active,
        archived:    fieldValues.archived,
      };

      zGame.parse(data);
      await mutation.mutateAsync<UpdateGameDto>(data);
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
