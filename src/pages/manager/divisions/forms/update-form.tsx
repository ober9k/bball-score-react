import { queryKeys } from "@/apis/query-keys.ts";
import { buildOptionsQueryOptions } from "@/apis/query-options.ts";
import type { CheckboxFieldState } from "@/components/forms/checkbox-field.tsx";
import CheckboxField from "@/components/forms/checkbox-field.tsx";
import FormButtons from "@/components/forms/form-buttons.tsx";
import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import type { SelectFieldState } from "@/components/forms/select-field.tsx";
import SelectField from "@/components/forms/select-field.tsx";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Separator } from "@/shared/components/ui/separator.tsx";
import type { BriefDivision } from "@/types/division.ts";
import type { Option } from "@/types/option.ts";
import type { Season } from "@/types/season.ts";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
    seasonId: string,
    activated: boolean,
    archived: boolean,
  },
  fieldErrors: {
    name?: string[],
    seasonId?: string[],
    activated?: string[],
    archived?: string[],
  },
};

/**
 * Prepare based off loaded division if provided.
 */
export function buildInitialState(division?: BriefDivision): FormState {
  const fieldValues = (division)
    ? {
      name:      division.name,
      seasonId:  division.seasonId.toString(), /* handled within select */
      activated: division.activated,
      archived:  division.archived,
    } : {
      name:      "",
      seasonId:  "",
      activated: false,
      archived:  false,
    }

  return {
    fieldValues, fieldErrors: {}, formErrors: []
  };
}

type DivisionFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  formMode: "create" | "update", /* todo: make into type */
  isPending: boolean,
  onCancel: () => void,
};

export default function UpdateForm({ formAction, formState, formMode, isPending, onCancel }: DivisionFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;
  const [ seasonsOptions, setSeasonsOptions ] = useState<Option[]>([]);
  const { data } = useQuery(buildOptionsQueryOptions(queryKeys.Seasons));

  useEffect(() => {
    if (data) {
      setSeasonsOptions(data as Option[]);
    }
  }, [data]);

  const nameFieldState: InputFieldState = {
    name:     "name",
    type:     "text",
    label:    "Name",
    description: "Enter a name between 1 and 20 characters which can be used to identify the division.",
    required: true,
    value:    fieldValues.name.toString(),
    errors:   fieldErrors.name || [],
  };

  const seasonIdFieldState: SelectFieldState = {
    name:     "seasonId",
    label:    "Season",
    required: true,
    value:    fieldValues.seasonId.toString(),
    values:   seasonsOptions,
    errors:   fieldErrors.seasonId || [],
  };

  const activatedFieldState: CheckboxFieldState = {
    name:     "activated",
    label:    "Activated",
    description: "An activated Division is available for selection and be displayed across the league.",
    value:    fieldValues.activated,
    errors:   fieldErrors.activated || [],
  };

  const archivedFieldState: CheckboxFieldState = {
    name:     "archived",
    label:    "Archived",
    description: "An archived Division is no longer accessible for selection, however will still be displayed for historic results.",
    value:    fieldValues.archived,
    errors:   fieldErrors.archived || [],
  };

  return (
    <Fragment>
      <form action={formAction}>
        <FieldGroup>
          <FieldSet>
            <FormErrors errors={formErrors} />
          </FieldSet>
          <FieldSet>
            <FieldLegend>
              Details
            </FieldLegend>
            <FieldDescription>
              A division is used as the parent for teams and players within a league.
            </FieldDescription>
            <InputField fieldState={nameFieldState} />
            <SelectField fieldState={seasonIdFieldState}></SelectField>
          </FieldSet>
          <Separator />
          <FieldSet>
            <FieldLegend>
              Configuration
            </FieldLegend>
            <FieldDescription>
              Set the state of the Division and any additional configurations.
            </FieldDescription>
            <CheckboxField fieldState={activatedFieldState} />
            <CheckboxField fieldState={archivedFieldState} />
          </FieldSet>
          <FieldSet>
            <FormButtons formMode={formMode} isPending={isPending} onCancel={onCancel} />
          </FieldSet>
        </FieldGroup>
      </form>
    </Fragment>
  );
}
