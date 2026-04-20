import { divisionsQueryOptions } from "@/apis/query-options.ts";
import CheckboxField from "@/components/forms/checkbox-field.tsx";
import type { CheckboxFieldState } from "@/components/forms/checkbox-field.tsx";
import FormButtons from "@/components/forms/form-buttons.tsx";
import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import type { SelectFieldState } from "@/components/forms/select-field.tsx";
import SelectField from "@/components/forms/select-field.tsx";
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Separator } from "@/shared/components/ui/separator.tsx";
import type { Division } from "@/types/division.ts";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
    shortName: string,
    divisionId: string,
    active: boolean,
    archived: boolean,
  },
  fieldErrors: {
    name?: string[],
    shortName: string[],
    divisionId?: string[],
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
  const [ divisions, setDivisions ] = useState<Division[]>([]);
  const { data } = useQuery(divisionsQueryOptions);

  useEffect(() => {
    if (data) {
      setDivisions(data as Division[]);
    }
  }, [data]);

  const nameFieldState: InputFieldState = {
    name:     "name",
    type:     "text",
    label:    "Name",
    description: "Enter a name between 1 and 20 characters which can be used to identify the team.",
    required: true,
    value:    fieldValues.name.toString(),
    errors:   fieldErrors.name || [],
  };

  const shortNameFieldState: InputFieldState = {
    name:     "shortName",
    type:     "text",
    label:    "Short Name",
    description: "Enter an abbreviation of 3 characters which can be used to identify the team.",
    required: true,
    value:    fieldValues.shortName.toString(),
    errors:   fieldErrors.shortName || [],
  };

  const divisionIdFieldState: SelectFieldState = {
    name:     "divisionId",
    label:    "Division",
    required: true,
    value:    fieldValues.divisionId.toString(),
    values:   divisions.map((division) => ({ label: division.name, value: division.id })),
    errors:   fieldErrors.divisionId || [],
  };

  const activeFieldState: CheckboxFieldState = {
    name:     "active",
    label:    "Active",
    description: "An active Team is available for selection and be displayed across the league.",
    value:    fieldValues.active,
    errors:   fieldErrors.active || [],
  };

  const archivedFieldState: CheckboxFieldState = {
    name:     "archived",
    label:    "Archived",
    description: "An archived Team is no longer accessible for selection, however will still be displayed for historic results.",
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
              A team is used as the parent for players within a league.
            </FieldDescription>
            <InputField fieldState={nameFieldState} />
            <InputField fieldState={shortNameFieldState} />
            <SelectField fieldState={divisionIdFieldState}></SelectField>
          </FieldSet>
          <Separator />
          <FieldSet>
            <FieldLegend>
              Configuration
            </FieldLegend>
            <FieldDescription>
              Set the state of the Team and any additional configurations.
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
