import { divisionsQueryOptions } from "@/apis/query-options.ts";
import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import type { SelectFieldState } from "@/components/forms/select-field.tsx";
import SelectField from "@/components/forms/select-field.tsx";
import { Button } from "@/shared/components/ui/button";
import { Field as UiField, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import type { DivisionDataWithId } from "@/types/division.ts";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
    shortName: string,
    divisionId: string,
  },
  fieldErrors: {
    name?: string[],
    shortName: string[],
    divisionId?: string[],
  },
};

type DivisionFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  formMode: "create" | "update"
  isPending: boolean,
  onCancel: () => void,
};

export default function UpdateForm({ formAction, formState, formMode, isPending, onCancel }: DivisionFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;
  const [ divisions, setDivisions ] = useState<DivisionDataWithId[]>([]);
  const { data } = useQuery(divisionsQueryOptions);

  useEffect(() => {
    if (data) {
      setDivisions(data as DivisionDataWithId[]);
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

  const isCreate = () => formMode === "create";

  const buttonLabels = (isCreate())
    ? ["Create", "Creating..."]
    : ["Update", "Updating..."];

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
          <FieldSet>
            <UiField orientation="horizontal" className="flex justify-center">
              <Button type="reset" variant="secondary" onClick={() => onCancel()}>
                Cancel
              </Button>
              <Button type="submit">
                {!isPending ? buttonLabels[0] : buttonLabels[1]}
              </Button>
            </UiField>
          </FieldSet>
        </FieldGroup>
      </form>
    </Fragment>
  );
}
