import { seasonsQueryOptions } from "@/apis/query-options.ts";
import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import SelectField from "@/components/forms/select-field.tsx";
import type { SelectFieldState } from "@/components/forms/select-field.tsx";
import { Button } from "@/shared/components/ui/button";
import { Field as UiField, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import type { SeasonDataWithId } from "@/types/season.ts";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
    seasonId: string,
  },
  fieldErrors: {
    name?: string[],
    seasonId?: string[],
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
  const [ seasons, setSeasons ] = useState<SeasonDataWithId[]>([]);
  const { data } = useQuery(seasonsQueryOptions);

  useEffect(() => {
    if (data) {
      setSeasons(data as SeasonDataWithId[]);
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
              A division is used as the parent for teams and players within a league.
            </FieldDescription>
            <InputField fieldState={nameFieldState} />
            <SelectField fieldState={seasonIdFieldState}></SelectField>
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
