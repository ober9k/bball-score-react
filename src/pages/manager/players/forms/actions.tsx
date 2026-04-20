import { onFieldError, onFormError, onSuccess, onUnexpectedError } from "@/lib/forms.ts";
import type { FormState } from "@/pages/manager/players/forms/update-form.tsx";
import { zPlayer } from "@/schemas/player.ts";
import type { UpdatePlayerDto } from "@/types/player.ts";
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
      name:     getValue("name"),
      position: getValue("position"),
      number:   getValue("number"),
      height:   getValue("height"),
      active:   getCheckboxValue("active"),
      archived: getCheckboxValue("archived"),
    };

    try {
      const data: UpdatePlayerDto = {
        name:     fieldValues.name,
        position: fieldValues.position,
        number:   fieldValues.number,
        height:   fieldValues.height,
        active:   fieldValues.active,
        archived: fieldValues.archived,
      };

      zPlayer.parse(data);
      await mutation.mutateAsync<UpdatePlayerDto>(data);
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
