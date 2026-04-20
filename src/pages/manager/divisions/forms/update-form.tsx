import { seasonsQueryOptions } from "@/apis/query-options.ts";
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
import type { Season } from "@/types/season.ts";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
    seasonId: string,
    active: boolean,
    archived: boolean,
  },
  fieldErrors: {
    name?: string[],
    seasonId?: string[],
    active?: string[],
    archived?: string[],
  },
};

type DivisionFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  formMode: "create" | "update", /* todo: make into type */
  isPending: boolean,
  onCancel: () => void,
};

export default function UpdateForm({ formAction, formState, formMode, isPending, onCancel }: DivisionFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;
  const [ seasons, setSeasons ] = useState<Season[]>([]);
  const { data } = useQuery(seasonsQueryOptions);

  useEffect(() => {
    if (data) {
      setSeasons(data as Season[]);
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
    values:   seasons.map((season) => ({ label: season.name, value: season.id })),
    errors:   fieldErrors.seasonId || [],
  };

  const activeFieldState: CheckboxFieldState = {
    name:     "active",
    label:    "Active",
    description: "An active Division is available for selection and be displayed across the league.",
    value:    fieldValues.active,
    errors:   fieldErrors.active || [],
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
            <CheckboxField fieldState={activeFieldState} />
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
