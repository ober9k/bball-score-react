import type { FormState } from "@/pages/manager/players/forms/update-form.tsx";
import { zPlayer } from "@/schemas/player.ts";
import type { PlayerData } from "@/types/player.ts";
import axios from "axios";
import { z } from "zod";

export const buildFormAction = (mutation) => {
  return async (formState: FormState, formData: FormData) => {

    const getValue = (key: string): string => {
      console.log("getValue", "key", key, formData.get(key).toString());
      return formData.get(key).toString();
    }

    const fieldValues = {
      name: getValue("name"),
      position: getValue("position"),
      number: getValue("number"),
      height: getValue("height"),
    };

    try {
      const data: PlayerData = {
        name: fieldValues.name,
        position: fieldValues.position,
        number: fieldValues.number,
        height: fieldValues.height,
      };

      zPlayer.parse(data);
      await mutation.mutateAsync<PlayerData>(data);
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = z.flattenError(error);

        return {
          fieldValues,
          fieldErrors,
          formErrors: [],
        };
      }
      else if (axios.isAxiosError(error)) {
        const { formErrors } = error.response.data;

        return {
          fieldValues,
          fieldErrors: {},
          formErrors,
        };
      }

      return {
        fieldValues,
        fieldErrors: {},
        formErrors: ["Unexpected error has occurred."],
      };
    }

    return {
      fieldValues,
      fieldErrors: {},
      formErrors: [],
    };
  };
}
