import { getCheckboxValue, getValue, onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import { mapPosition } from "@/lib/player-utils.ts";
import type { FormState } from "@/pages/manager/players/forms/update-form.tsx";
import { zPlayer } from "@/schemas/player.ts";
import type { UpdatePlayerDto } from "@/types/player.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const fieldValues = {
      name:      getValue(formData, "name"),
      position:  getValue(formData, "position"),
      number:    getValue(formData, "number"),
      height:    getValue(formData, "height"),
      activated: getCheckboxValue(formData, "activated"),
      archived:  getCheckboxValue(formData, "archived"),
    };

    try {
      const data: UpdatePlayerDto = {
        name:      fieldValues.name,
        position:  mapPosition(fieldValues.position),
        number:    fieldValues.number,
        height:    fieldValues.height,
        activated: fieldValues.activated,
        archived:  fieldValues.archived,
      };

      zPlayer.parse(data);
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
