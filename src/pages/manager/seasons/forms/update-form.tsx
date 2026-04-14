import FormErrors from "@/components/forms/form-errors.tsx";
import type { InputFieldState } from "@/components/forms/input-field.tsx";
import InputField from "@/components/forms/input-field.tsx";
import { Button } from "@/shared/components/ui/button";
import { Field as UiField, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Fragment } from "react";

export type FormState = {
  formErrors: string[],
  fieldValues: {
    name: string,
  },
  fieldErrors: {
    name?: string[],
  },
};

type SeasonFormProps = {
  formAction: (payload: FormData) => void,
  formState: FormState,
  formMode: "create" | "update"
  isPending: boolean,
  onCancel: () => void,
};

export default function UpdateForm({ formAction, formState, formMode, isPending, onCancel }: SeasonFormProps) {
  const { formErrors, fieldValues, fieldErrors } = formState;

  const nameFieldState: InputFieldState = {
    name:     "name",
    type:     "text",
    label:    "Name",
    description: "Enter a name between 1 and 20 characters which can be used to identify the season.",
    required: true,
    value:    fieldValues.name.toString(),
    errors:   fieldErrors.name || [],
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
              A season is used as the parent for divisions, teams and games for within a league.
            </FieldDescription>
            <InputField fieldState={nameFieldState} />
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
