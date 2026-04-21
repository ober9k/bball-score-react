import { onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/games/forms/update-form.tsx";
import { zGame } from "@/schemas/game.ts";
import type { UpdateGameDto } from "@/types/game.ts";
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
      date:       getValue("date"),
      phase:      getValue("phase"),
      round:      getValue("round"),
      seasonId:   getValue("seasonId"),
      divisionId: getValue("divisionId"),
      active:     getCheckboxValue("active"),
      archived:   getCheckboxValue("archived"),
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
